export default {
  "Use Case Diagram": {
        type:"uml-chart-widget", 
        // id:Vue.prototype.$djvue.randomName(),
        name:"noname",
        icon:"mdi-shape-outline",
        options: { 
          widget:{
            visible: true
          }
         },
        data:{
          source:"embedded",
          embedded:
`@startuml
actor Guest
  actor User
  actor Manager
  
  usecase Registration
  usecase "Activate(reactivate) Profile" as AP
  usecase Login
  
  usecase "Profile \\nManagement" as PM
  usecase "Create \\nEntry Point" as CEP
  usecase "Entry Point \\nManagement" as EPM
  usecase "Restore \\nPassword" as RP
  
  
  User -u-|> Guest
  Manager -u-|> User
  
  Guest -> Registration
  
  User -u-> Login
  User -l-> PM
  User -> CEP
  User --> AP
  User --> RP
  
  Manager -> EPM
@enduml`
        }
    },

"Activity Diagram": {
        type:"uml-chart-widget", 
        // id:Vue.prototype.$djvue.randomName(),
        name:"noname",
        icon:"mdi-shape-outline",
        options: { 
          widget:{
            visible: true
          }
         },
        data:{
          source:"embedded",
          embedded:
`@startuml
|Swimlane1|
start
:foo1;
|#AntiqueWhite|Swimlane2|
:foo2;
:foo3;
|Swimlane1|
:foo4;
|Swimlane2|
:foo5;
stop
@enduml`
        }
    },

"Sequence Diagram": {
        type:"uml-chart-widget", 
        // id:Vue.prototype.$djvue.randomName(),
        name:"noname",
        icon:"mdi-shape-outline",
        options: { 
          widget:{
            visible: true
          }
         },
        data:{
          source:"embedded",
          embedded:
`@startuml
Alice -> Bob: Authentication Request
Bob --> Alice: Authentication Response

Alice -> Bob: Another authentication Request
Alice <-- Bob: Another authentication Response
@enduml`
        }
    },

"Component Diagram": {
        type:"uml-chart-widget", 
        // id:Vue.prototype.$djvue.randomName(),
        name:"noname",
        icon:"mdi-shape-outline",
        options: { 
          widget:{
            visible: true
          }
         },
        data:{
          source:"embedded",
          embedded:
`@startuml

package "Some Group" {
  HTTP - [First Component]
  [Another Component]
}

node "Other Groups" {
  FTP - [Second Component]
  [First Component] --> FTP
}

cloud {
  [Example 1]
}


database "MySql" {
  folder "This is my folder" {
    [Folder 3]
  }
  frame "Foo" {
    [Frame 4]
  }
}


[Another Component] --> [Example 1]
[Example 1] --> [Folder 3]
[Folder 3] --> [Frame 4]

@enduml`
        }
    },
"State Diagram": {
        type:"uml-chart-widget", 
        // id:Vue.prototype.$djvue.randomName(),
        name:"noname",
        icon:"mdi-shape-outline",
        options: { 
          widget:{
            visible: true
          }
         },
        data:{
          source:"embedded",
          embedded:
`@startuml
scale 350 width
[*] --> NotShooting

state NotShooting {
  [*] --> Idle
  Idle --> Configuring : EvConfig
  Configuring --> Idle : EvConfig
}

state Configuring {
  [*] --> NewValueSelection
  NewValueSelection --> NewValuePreview : EvNewValue
  NewValuePreview --> NewValueSelection : EvNewValueRejected
  NewValuePreview --> NewValueSelection : EvNewValueSaved

  state NewValuePreview {
     State1 -> State2
  }

}
@enduml`
        }
    },
"Object Diagram": {
        type:"uml-chart-widget", 
        // id:Vue.prototype.$djvue.randomName(),
        name:"noname",
        icon:"mdi-shape-outline",
        options: { 
          widget:{
            visible: true
          }
         },
        data:{
          source:"embedded",
          embedded:
`@startuml
object Object01
object Object02
object Object03
object Object04
object Object05
object Object06
object Object07
object Object08

Object01 <|-- Object02
Object03 *-- Object04
Object05 o-- "4" Object06
Object07 .. Object08 : some labels
@enduml`
        }
    },

"Deployment Diagram": {
        type:"uml-chart-widget", 
        // id:Vue.prototype.$djvue.randomName(),
        name:"noname",
        icon:"mdi-shape-outline",
        options: { 
          widget:{
            visible: true
          }
         },
        data:{
          source:"embedded",
          embedded:
`@startuml
folder folder [
This is a <b>folder
----
You can use separator
====
of different kind
....
and style
]

node node [
This is a <b>node
----
You can use separator
====
of different kind
....
and style
]

database database [
This is a <b>database
----
You can use separator
====
of different kind
....
and style
]

usecase usecase [
This is a <b>usecase
----
You can use separator
====
of different kind
....
and style
]

card card [
This is a <b>card
----
You can use separator
====
of different kind
....
and style
<i><color:blue>(add from V1.2020.7)</color></i>
]
@enduml`
        }
    },

"Class Diagram": {
        type:"uml-chart-widget", 
        // id:Vue.prototype.$djvue.randomName(),
        name:"noname",
        icon:"mdi-shape-outline",
        options: { 
          widget:{
            visible: true
          }
         },
        data:{
          source:"embedded",
          embedded:
`@startuml

abstract class AbstractList
abstract AbstractCollection
interface List
interface Collection

List <|-- AbstractList
Collection <|-- AbstractCollection

Collection <|- List
AbstractCollection <|- AbstractList
AbstractList <|-- ArrayList

class ArrayList {
  Object[] elementData
  size()
}

enum TimeUnit {
  DAYS
  HOURS
  MINUTES
}

annotation SuppressWarnings

@enduml`
        }
    }



}        
