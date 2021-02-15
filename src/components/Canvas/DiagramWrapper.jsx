import * as React from 'react'
import * as go from 'gojs'
import { ReactDiagram } from 'gojs-react'
import _, { last } from 'lodash'

import './DiagramWrapper.css'

import diagramOptions from './diagram.options'
import TemporaryDrawer from '../Drawer'
import Modal from '../Modal'
import { DrawerFields } from '../Drawer/DrawerFileds'
import { Divider } from '@material-ui/core'
import { AddNewItem } from '../Drawer/AddNewItem'

export default class DiagramWrapper extends React.Component {
  TIMEOUT = 1500
  constructor(props) {
    super(props)
    this.diagramRef = React.createRef()

    this.state = {
      openModal: false,
      drawerData: null,
      openDrawer: false
    }
  }

  onEventListener = (event) => {
    const {
      subject: {
        part: { data }
      }
    } = event

    this.setState({ openDrawer: true, drawerData: data })
  }

  openModal = () => {
    this.setState({ openModal: true })
  }

  closeModal = () => {
    this.setState({ openModal: false })
  }

  autoCloseModal = (timeout) => {
    setTimeout(this.closeModal, timeout)
  }

  closeDrawer = () => {
    this.setState({ openDrawer: false })
  }

  componentDidMount() {
    if (!this.diagramRef.current) return
    const diagram = this.diagramRef.current.getDiagram()
    if (diagram instanceof go.Diagram) {
      diagram.addDiagramListener('ObjectDoubleClicked', this.onEventListener)
    }
  }

  componentWillUnmount() {
    if (!this.diagramRef.current) return
    const diagram = this.diagramRef.current.getDiagram()
    if (diagram instanceof go.Diagram) {
      diagram.removeDiagramListener('ObjectDoubleClicked', this.onEventListener)
    }
  }

  initDiagram = () => {
    const $ = go.GraphObject.make

    this.props.setDiagramData(diagramOptions)
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

    diagram.model = $(go.TreeModel)

    return diagram
  }

  onChangeModel = (newOption) => {
    const { diagramData } = this.props
    const idx = _.findIndex(diagramData, ['key', newOption.key])

    if (idx === -1) return

    diagramData[idx] = newOption

    this.openModal()
    this.props.setDiagramData(diagramData)
    this.autoCloseModal(this.TIMEOUT)
  }

  addNewItem = (newItem) => {
    const { diagramData } = this.props
    const lastKey = last(diagramData).key

    if (!lastKey) return

    const newKey = lastKey + 1

    const newElement = {
      ...newItem,
      key: newKey
    }

    diagramData.push(newElement)

    this.openModal()
    this.props.setDiagramData(diagramData)
    this.autoCloseModal(this.TIMEOUT)
  }

  render() {
    return (
      <div className="diagram-wrapper">
        <ReactDiagram
          ref={this.diagramRef}
          initDiagram={this.initDiagram}
          divClassName="diagram-component"
          nodeDataArray={this.props.diagramData}
        />
        <Modal
          text="Model successfuly changed"
          open={this.state.openModal}
          closeModal={this.closeModal}
        />
        <TemporaryDrawer
          side={'right'}
          open={this.state.openDrawer}
          closeDrawer={this.closeDrawer}
        >
          <DrawerFields
            data={this.state.drawerData}
            onChangeModel={this.onChangeModel}
            closeDrawer={this.closeDrawer}
          />
          <Divider />
          <AddNewItem
            data={this.state.drawerData}
            closeDrawer={this.closeDrawer}
            addNewItem={this.addNewItem}
          />
        </TemporaryDrawer>
      </div>
    )
  }
}
