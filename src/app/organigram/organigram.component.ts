import { Component, OnInit } from '@angular/core';

import { OrganigramDataService } from './organigram-data.service';

declare var $;
declare var ej;

@Component({
  selector: 'app-organigram',
  templateUrl: './organigram.component.html',
  styleUrls: ['./organigram.component.css'],
  providers: [OrganigramDataService]
})
export class OrganigramComponent implements OnInit {

  private data;
  private root = "parent";

  constructor(private organigramDataService:OrganigramDataService) { }

  ngOnInit() {
    this.data = this.organigramDataService.getData();
    //this.createBoxTemplate();
    this.createDiagram();
    $(document).on("click", '.boxCollapse', function (aEvent) {
        console.log("boxCollapse", aEvent.currentTarget.attributes.data.value);
        this.collaspe(aEvent.currentTarget.attributes.data.value);
    }.bind(this));
    $(document).on("click", '.boxDrillDown', function (aEvent) {
        console.log("boxDrillDown", aEvent.currentTarget.attributes.data.value);
        this.drillDown(aEvent.currentTarget.attributes.data.value);
    }.bind(this));
    
  }

  createDiagram(){
    $("#diagram").ejDiagram({
        width: "100%", height: "700px",
        //use automatic layout to arranging elements on the page
        layout: {
            type: "organizationalchart", marginX: 0, marginY: 50, horizontalSpacing: 30, verticalSpacing: 30,
            /*getLayoutInfo: getLayoutInfo,*/
        },
        defaultSettings: {
            //set the default properties of the nodes.
            node: {
                width: 358, height: 138, type: ej.datavisualization.Diagram.Shapes.Html, borderColor: "transparent", borderWidth:0,
                templateId: "htmlTemplate",
                title:"", description:"", nameId:""
            },
            //set the default properties of the connectors.
            connector: { segments: [{ "type": "orthogonal" }], targetDecorator: { shape: "none" } }
        },
        //initialize the node template.
        nodeTemplate: this.nodeTemplate.bind(this),
        pageSettings: { scrollLimit: "diagram" },
        tool: ej.datavisualization.Diagram.Tool.ZoomPan,
        snapSettings: { snapConstraints: ej.datavisualization.Diagram.SnapConstraints.None },
        enableContextMenu: false,

        //configure data source for diagram
        dataSourceSettings: {
            id: "Id", parent: "ReportingPerson", root:this.root,
            //specifies the dataSource
            dataSource: this.data
        }
    });
    $("#diagram").ejDiagram("instance").fitToPage();
  }

  collaspe(aName){
    var diagram = $("#diagram").ejDiagram("instance");
    let node = diagram.findNode(aName);
    $("#diagram").ejDiagram({ layout: { fixedNode: node.name } });
    diagram.updateNode(node.name, {isExpanded: !node.isExpanded});
  }

  drillDown(aName){
    console.log(aName);
    var diagram = $("#diagram").ejDiagram("instance");
    let node = diagram.findNode(aName);
    $("#diagram").ejDiagram({ layout: { fixedNode: node.name } });
    this.root = node.Id;
    $("#diagram").ejDiagram("instance").clear();
    this.createDiagram();
  }

  nodeTemplate(diagram, node) {
      node.nameId = node.name;
      node.title = node.Name;
      node.description = node.Designation;
      
      node.isExpanded = node.ReportingPerson == this.root || node.Id == this.root ? true : false
      console.log(node.ReportingPerson, this.root, node.isExpanded, node.name);
  }

}
