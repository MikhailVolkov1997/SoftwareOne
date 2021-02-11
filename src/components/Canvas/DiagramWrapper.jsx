import * as go from 'gojs'
import { ReactDiagram } from 'gojs-react'
import * as React from 'react'

import { FreehandDrawingTool } from './FreehandDrawingTool'
import { GeometryReshapingTool } from './GeometryReshapingTool'

import './Canvas.css'
import diagramOptions from './diagram.options'
import Modal from '../Modal'

export default class DiagramWrapper extends React.Component {
  constructor(props) {
    super(props)
    this.diagramRef = React.createRef()

    this.state = {
      openModal: false,
      modalData: null
    }
  }

  onEventListener = (event) => {
    const {
      subject: {
        part: { data }
      }
    } = event

    this.setState({ openModal: true, modalData: data })
  }

  closeModal = () => {
    this.setState({ openModal: false })
  }

  componentDidMount() {
    if (!this.diagramRef.current) return
    const diagram = this.diagramRef.current.getDiagram()
    if (diagram instanceof go.Diagram) {
      diagram.addDiagramListener('ObjectSingleClicked', this.onEventListener)
    }
  }

  componentWillUnmount() {
    if (!this.diagramRef.current) return
    const diagram = this.diagramRef.current.getDiagram()
    if (diagram instanceof go.Diagram) {
      diagram.removeDiagramListener('ChangedSelection', this.onEventListener)
    }
  }

  initDiagram = () => {
    const $ = go.GraphObject.make
    // set your license key here before creating the diagram: go.Diagram.licenseKey = "...";
    const diagram = $(go.Diagram, {
      allowCopy: false,
      allowDelete: false,
      allowMove: false,
      initialAutoScale: go.Diagram.Uniform,
      layout: $('TreeLayout', {
        angle: 90,
        compaction: go.TreeLayout.CompactionNone
      }),
      'undoManager.isEnabled': true
    })

    diagram.nodeTemplate = $(
      go.Node,
      'Vertical',
      { selectionObjectName: 'BODY' },
      $(
        go.Panel,
        'Auto',
        { name: 'BODY' },
        $(
          go.Shape,
          'RoundedRectangle',
          new go.Binding('fill'),
          new go.Binding('stroke')
        ),
        $(
          go.TextBlock,
          {
            font: 'bold 12pt Arial, sans-serif',
            margin: new go.Margin(4, 2, 2, 2)
          },
          new go.Binding('text')
        )
      ),
      $(
        go.Panel, // this is underneath the "BODY"
        { height: 17 }, // always this height, even if the TreeExpanderButton is not visible
        $('TreeExpanderButton')
      )
    )

    diagram.linkTemplate = $(go.Link, $(go.Shape, { strokeWidth: 1.5 }))

    diagram.model = $(go.TreeModel, { nodeDataArray: diagramOptions })

    return diagram
  }

  render() {
    return (
      <div className="diagram-wrapper">
        <ReactDiagram
          ref={this.diagramRef}
          initDiagram={this.initDiagram}
          divClassName="diagram-component"
          onModelChange={(e) => console.log(e)}
        />
        <Modal
          modalData={this.state.modalData}
          open={this.state.openModal}
          closeModal={this.closeModal}
        />
      </div>
    )
  }
}
