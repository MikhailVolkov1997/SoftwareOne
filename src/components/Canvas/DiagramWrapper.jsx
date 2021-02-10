import * as go from 'gojs'
import { ReactDiagram } from 'gojs-react'
import * as React from 'react'

import { FreehandDrawingTool } from './FreehandDrawingTool'
import { GeometryReshapingTool } from './GeometryReshapingTool'

import './Canvas.css'

export default class DiagramWrapper extends React.Component {
  /**
   * Ref to keep a reference to the Diagram component, which provides access to the GoJS diagram via getDiagram().
   */

  /** @internal */
  constructor(props) {
    super(props)
    this.diagramRef = React.createRef()
  }

  /**
   * Get the diagram reference and add any desired diagram listeners.
   * Typically the same function will be used for each listener, with the function using a switch statement to handle the events.
   */
  componentDidMount() {
    if (!this.diagramRef.current) return
    const diagram = this.diagramRef.current.getDiagram()
    if (diagram instanceof go.Diagram) {
      diagram.addDiagramListener('ChangedSelection', this.props.onDiagramEvent)
    }
  }

  /**
   * Get the diagram reference and remove listeners that were added during mounting.
   */
  componentWillUnmount() {
    if (!this.diagramRef.current) return
    const diagram = this.diagramRef.current.getDiagram()
    if (diagram instanceof go.Diagram) {
      diagram.removeDiagramListener(
        'ChangedSelection',
        this.props.onDiagramEvent
      )
    }
  }

  /**
   * Diagram initialization method, which is passed to the ReactDiagram component.
   * This method is responsible for making the diagram and initializing the model, any templates,
   * and maybe doing other initialization tasks like customizing tools.
   * The model's data should not be set here, as the ReactDiagram component handles that.
   */
  initDiagram() {
    const $ = go.GraphObject.make
    // set your license key here before creating the diagram: go.Diagram.licenseKey = "...";
    const diagram = $(go.Diagram, {
      'undoManager.isEnabled': true, // must be set to allow for model change listening
      // 'undoManager.maxHistoryLength': 0,  // uncomment disable undo/redo functionality
      'clickCreatingTool.archetypeNodeData': {
        text: 'new node',
        color: 'lightblue'
      },
      //   draggingTool: new FreehandDrawingTool(), // defined in GuidedDraggingTool.ts
      layout: $(go.ForceDirectedLayout),
      model: $(go.GraphLinksModel, {
        linkKeyProperty: 'key', // IMPORTANT! must be defined for merges and data sync when using GraphLinksModel
        // positive keys for nodes
        makeUniqueKeyFunction: (m, data) => {
          let k = data.key || 1
          while (m.findNodeDataForKey(k)) k++
          data.key = k
          return k
        },
        // negative keys for links
        makeUniqueLinkKeyFunction: (m, data) => {
          let k = data.key || -1
          while (m.findLinkDataForKey(k)) k--
          data.key = k
          return k
        }
      })
    })

    diagram.toolManager.mouseDownTools.insertAt(3, new GeometryReshapingTool())

    diagram.nodeTemplateMap.add(
      'FreehandDrawing',
      $(
        go.Part,
        { locationSpot: go.Spot.Center, isLayoutPositioned: false },
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(
          go.Point.stringify
        ),
        {
          selectionAdorned: true,
          selectionObjectName: 'SHAPE',
          // custom selection adornment: a blue rectangle
          selectionAdornmentTemplate: $(
            go.Adornment,
            'Auto',
            $(go.Shape, { stroke: 'dodgerblue', fill: null }),
            $(go.Placeholder, { margin: -1 })
          )
        },
        { resizable: true, resizeObjectName: 'SHAPE' },
        { rotatable: true, rotateObjectName: 'SHAPE' },
        { reshapable: true }, // GeometryReshapingTool assumes nonexistent Part.reshapeObjectName would be "SHAPE"
        $(
          go.Shape,
          { name: 'SHAPE', fill: null, strokeWidth: 1.5 },
          new go.Binding('desiredSize', 'size', go.Size.parse).makeTwoWay(
            go.Size.stringify
          ),
          new go.Binding('angle').makeTwoWay(),
          new go.Binding('geometryString', 'geo').makeTwoWay(),
          new go.Binding('fill'),
          new go.Binding('stroke'),
          new go.Binding('strokeWidth')
        )
      )
    )

    const tool = new FreehandDrawingTool()
    // provide the default JavaScript object for a new polygon in the model
    tool.archetypePartData = {
      stroke: 'black',
      strokeWidth: 1.5,
      category: 'FreehandDrawing'
    }
    // allow the tool to start on top of an existing Part
    tool.isBackgroundOnly = false
    // install as first mouse-move-tool
    diagram.toolManager.mouseMoveTools.insertAt(0, tool)

    return diagram
  }

  modeChange = (isDraw) => {
    const diagram = this.diagramRef.current.getDiagram()
    const tool = diagram.toolManager.findTool('FreehandDrawing')
    tool.isEnabled = isDraw
  }

  render() {
    return (
      <div className="diagram-wrapper">
        <ReactDiagram
          ref={this.diagramRef}
          divClassName="diagram-component"
          initDiagram={this.initDiagram}
        />
        <div className="mode-buttons">
          <button onClick={() => this.modeChange(false)}>Select</button>
          <button onClick={() => this.modeChange(true)}>Draw mode</button>
        </div>
      </div>
    )
  }
}
