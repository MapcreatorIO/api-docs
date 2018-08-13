---
title: Map Definition

toc_footers:
  - <a href='https://api.maps4news.com/register'>Sign Up for Maps4News</a>
  - <a href='https://github.com/lord/slate'>Documentation Powered by Slate</a>
  
includes:
  - directory

search: true
---

# Dispatcher JSON Specification

## Request

### coordinateBase (abstract)

This object represents a coordinate

| Field    | Type   | Required | Description                              |
| -------- | ------ | -------- | ---------------------------------------- |
| coordSys | string | Yes      | Defines the type of coordinate, can either be "wgs" |



### wgsCoordinate

This object represents a wgsCoordinate

##### Extends

- coordinateBase

| Field | Type   | Required | Description |
| ----- | ------ | -------- | ----------- |
| lat   | number | Yes      | Latitide    |
| long  | number | Yes      | Longitude   |

```json
{
  "coordSys": "wgs"
  "lat": 35.006605,
  "long": 138.978468
}
```



### coordinate

This object represents a coordinate

This object can either be

- wgsCoordinate


```json
{
  "coordSys": "wgs",
  "lat": 35.006605,
  "long": 138.978468
}
```




### boundingBox

This object represents a bounding-box

| Field    |    Type    | Required | Description                              |
| -------- | :--------: | :------: | ---------------------------------------- |
| downLeft | coordinate |   Yes    | Down left coordinate of the bounding box |
| upRight  | coordinate |   Yes    | Up right coordinate of the bounding box  |

```json
{
  "downLeft": {
    "coordSys": "wgs",
    "lat": 35.006605,
    "long": 138.978468
  },
  "upRight": {
    "coordSys": "wgs",
    "lat": 36.355587,
    "long": 140.639232    
  }
}
```



### size

This object represents the definition of a real-life size ( not based on scale )

| Field |  Type  | Required | Description                              |
| ----- | :----: | :------: | :--------------------------------------- |
| value | number |   Yes    | Value for the size.                      |
| unit  | string |   Yes    | Type of size, can be either “centimeter”, “millimeter”, “yard”, "foot", "inch" or "point" |

```json
{
  "value": 0.5,
  "unit": "millimeter"
}
```



### fromPois

This object represents the definition of a bounding box that is based on the locations of the POI's

| Field  | Type | Required | Description                              |
| ------ | :--: | :------- | ---------------------------------------- |
| margin | Size | Yes      | Margin that makes the bounding box grow at the top, bottom, left and right |

```json
{
  "margin": {
    "value": 0.5,
    "unit": "centimeter"
  }
}
```



### scale

This object represents the definition of a bounding box that is based on a scale and center coordinate.

| Field |    Type    | Required | Description                        |
| ----- | :--------: | :------: | ---------------------------------- |
| scale |  integer   |   Yes    | The scale of the map. ***min***: 1 |
| coord | coordinate |   Yes    | Center of the map                  |

```json
{
  "scale": 116700,
  "coord": {
    "coordSys": "wgs",
    "lat": 14.473630137293394,
    "long": 120.89016269892454
  }
}
```



### dimension

This object represents the definition of a dimension ( not based on scale )

| Field  | Type | Required | Description               |
| ------ | :--: | :------: | :------------------------ |
| width  | size |   Yes    | Width size for dimension  |
| height | size |   yes    | Height size for dimension |

```json
{
  "width": {
    "unit": "millimeter",
    "value": 75
  },
  "height": {
    "unit": "millimeter",
    "value": 50
  }
}
```



### color

This object represents the definition of a RGB color

| Field |  Type   | Required | Description       |
| ----- | :-----: | :------: | :---------------- |
| R     | integer |   Yes    | Red color value   |
| G     | integer |   Yes    | Green color value |
| B     | integer |   Yes    | Blue color value  |

```json
{
  "R": 135,
  "G": 206,
  "B": 250
}
```



### line

This object represents the definition of a line

| Field     |  Type  | Required | Description                              |
| --------- | :----: | :------: | :--------------------------------------- |
| color     | color  |   Yes    | Color of the line                        |
| thickness |  size  |   Yes    | Thickness of the line based on a real-life size |
| style     | string |   Yes    | Style of the line, can either be: "solid", "dotted", "dash5_5", "dash3_7", "dashDot", "dashDot1", "dashDotDot", "ticked", "doubleDash", "dotDash", "beaded" |

```json
{
  "color": {
    "R": 135,
    "G": 206,
    "B": 250
  },
  "thickness": {
    "unit": "millimeter",
    "size": 0.1
  },
  "style": "beaded"
}
```



### textbox

This object represents a textbox

| Field      | Type  | Required | Description                     |
| ---------- | :---: | :------: | :------------------------------ |
| background | color |    No    | Background color of the textbox |
| border     | line  |    No    | Border line of the textbox      |

```json
{
  "background": {
    "R": 135,
    "G": 206,
    "B": 250
  },
  "border": {
    "color": {
      "R": 100,
      "G": 200,
      "B": 125
    },
    "thickness": {
      "unit": "millimeter",
      "size": 0.01
    },
    "style": "solid"
  }
}
```



### font

This object represents a font

| Field   |  Type  | Required | Description                              |
| ------- | :----: | :------: | :--------------------------------------- |
| size    |  size  |   Yes    | Size of the font in real-life size       |
| name    | string |   Yes    | Fontname, possible values can be found in the font section of the documentation |
| color   | color  |   Yes    | Color of the font                        |
| outline |  line  |    No    | Outline style of the font                |

```json
{
  "size": {
    "unit": "millimeter",
    "value": 1
  },
  "name": "Helvetica",
  "color": {
    "R": 0,
    "G": 0,
    "B": 0
  }
}
```



### position

This object represents a position based on an X and Y offset from the top left of the map

| Field | Type | Required | Description                  |
| ----- | ---- | :------: | ---------------------------- |
| X     | size |   Yes    | X offset in a real-life size |
| Y     | size |   Yes    | Y offset in a real-life size |

```json
{
  "X": {
    "unit": "millimeter",
    "value": 0.1
  },
  "Y": {
    "unit": "millimeter",
    "value": 0.15
  }
}
```



### alignment

This object represents an alignment on the map or on an icon


| Field | Type   | Required | Description                              |
| ----- | ------ | -------- | ---------------------------------------- |
| type  | string | Yes      | Type of size, can be either "topleft", "centerleft", "bottomleft", "centertop", "centerbottom", "topright", "centerright", "bottomright", "middle" |

```json
{
  "type": "centertop"
}
```



### label

This object represents a label

| Field    | Type      | Required | Description                           |
| -------- | --------- | -------- | ------------------------------------- |
| text     | string    | Yes      | Text that the label will contain      |
| font     | font      | Yes      | The font definition of the label      |
| textbox  | textbox   | No       | The textbox that the label will be in |
| location | position  | Yes      | Position on the map                   |
| anchor   | alignment | Yes      | Where does the position need to start |

```json
{
  "text": "Church",
  "font": {
    "name": "Helvetica",
    "size": {
      "unit": "millimeter",
      "value": 0.1
    },
    "location": {
      "X": {
        "unit": "millimeter",
        "value": 0.2
      },
      "Y": {
        "unit": "millimeter",
        "value": 0.3
      }
    },
    "anchor": "middle"
  }
}
```



### scalebar

This object represents a scalebar

| Field    | Type      | Required | Description                              |
| -------- | --------- | -------- | ---------------------------------------- |
| size     | size      | Yes      | Size of the scalebar                     |
| fontname | string    | Yes      | Name of the font that the scalebar will use |
| type     | string    | Yes      | Type of scalebar, can either be "metric" or "imperial" |
| margin   | dimension | No       | Offset/Margin of the scalebar            |
| anchor   | alignment | Yes      | Anchor on the map                        |

```json
{
  "size": {
    "unit": "millimeter",
    "value": 0.1
  },
  "fontname": "Helvetica",
  "type": "metric",
  "margin": {
    "width": {
      "unit": "millimeter",
      "value": 0.1
    },
    "height": {
      "unit": "millimeter",
      "value": 0.1
    }
  },
  "anchor": "centertop"
}
```



### northIndicator

This object represents a north indicator

| Field     | Type      | Required | Description                          |
| --------- | --------- | -------- | ------------------------------------ |
| size      | size      | Yes      | Size of the north indicator          |
| arrow     | color     | No       | Color of the arrow                   |
| northSign | color     | No       | Color of the font                    |
| margin    | dimension | No       | Offset/Margin of the north indicator |
| anchor    | alignment | Yes      | Anchor on the map                    |

```json
{
  "size": {
    "unit": "millimeter",
    "value": 0.3
  },
  "arrow": {
    "R": 0,
    "G": 0,
    "B": 0
  },
  "northSign": {
    "R": 255,
    "G": 255,
    "B": 255
  },
  "margin": {
    "width": {
      "unit": "millimeter",
      "value": 0.1
    },
    "height": {
      "unit": "millimeter",
      "value": 0.1
    }
  },
  "anchor": "centertop"
}
```



### grid

This object represents a grid that will be put on top of the map

| Field         | Type    | Required | Description                              |
| ------------- | ------- | -------- | ---------------------------------------- |
| line          | line    | Yes      | Defines the line that the grid will use  |
| font          | font    | Yes      | Defines the font for the characters of the grid |
| lineDist      | size    | Yes      | Defines the distance between each line   |
| alphaHori     | string  | Yes      | Type of grid, can either be "oneChar", "twoChar", "doubleChar" |
| charsPerBlock | integer | Yes      | Defines the chars per block              |

```json
{
  "line": {
    "color": {
      "R": 0,
      "G": 0,
      "B": 0
    },
    "thickness": {
      "unit": "millimeter",
      "value": 0.01
    },
    "style": "solid"
  },
  "font": {
    "size": {
      "unit": "millimeter",
      "value": 0.1
    },
    "name": "Helvetica",
    "color": {
      "R": 0,
      "G": 0,
      "B": 0
    }
  },
  "lineDist": {
    "unit": "millimeter",
    "value": 0.1
  },
  "alphaHori": "oneChar",
  "charsPerBlock": 1
}
```



### polygon

This objects represents a polygon

| Field      | Type    | Required | Description                              |
| ---------- | ------- | -------- | ---------------------------------------- |
| outline    | line    | No       | Outline definition of the polygon        |
| fill       | color   | No       | Fill color of the polygon                |
| polystring | string  | Yes      | Encoded string of the coordinates.       |
| solid      | boolean | Yes      | Defines if the polygon needs to be cleared of labels |

```json
{
  "fill": {
    "R": 255,
    "G": 255,
    "B": 255
  },
  "polystring": "_p~iF~ps|U_ulLnnqC_mqNvxq`@",
  "solid": false
}
```



### polyline

This objects represents a polyline 

| Field      | Type   | Required | Description                       |
| ---------- | ------ | -------- | --------------------------------- |
| line       | line   | Yes      | Line definition of the polystring |
| polystring | string | Yes      | Encoded string of the coordinates |

```json
{
  "line": {
    "color": {
      "R": 255,
      "G": 255,
      "B": 255
    },
    "thickness": {
      "unit": "millimeter",
      "value": 0.1
    },
    "polystring": "_p~iF~ps|U_ulLnnqC_mqNvxq`@"
  }
}
```



### mapstyle

This objects represents a mapstyle

| Field | Type    | Required | Description                   |
| ----- | ------- | -------- | ----------------------------- |
| name  | string  | Yes      | Filename of the mapstyle      |
| scale | integer | Yes      | Maximum scale of the mapstyle |

```json
{
  "name": "Here10K.xml",
  "scale": 16249
}
```



### copyright

This object represents a copyright box

| Field   | Type      | Required | Description                              |
| ------- | --------- | -------- | ---------------------------------------- |
| textbox | textbox   | No       | Defines the textbox where the copyright string will be in |
| font    | font      | Yes      | Defines the font that will be used for the copyright |
| anchor  | alignment | Yes      | Defines where on the map the copyright should be aligned |
| margin  | dimension | No       | Margin/Offset of the copyright based on the anchor |

```json
{
  "font": {
    "name": "Helvetica",
    "size": {
      "unit": "millimeter",
      "value": 0.1
    },
    "color": {
      "R": 0,
      "G": 0,
      "B": 0
    }
  },
  "anchor": "centertop",
  "margin": {
    "width": {
      "unit": "millimeter",
      "value": 0.1
    },
    "height": {
      "unit": "millimeter",
      "value" 0.1
    }
  }
}
```



### metadata

This object represents metadata

| Field       | Type              | Required | Description                              |
| ----------- | ----------------- | -------- | ---------------------------------------- |
| id          | unsigned integer  | Yes      | Unique identifier of the map             |
| mapstyleSet | array of mapStyle | Yes      | Mapstyle set that will be used           |
| rotation    | integer           | Yes      | Rotation of the map                      |
| copyright   | copyright         | Yes      | **This element should always be visible on your map**. Copyright of the map, the right text will be automatically generated. |
| szhack      | boolean           | Yes      | Defines if the map needs to implement the szhack for latin encoding |
| preview     | boolean           | Yes      | Defines if the map needs to generate a png preview |

```json
{
  "id": 1,
  "mapstyle": [
    {
      "name":"Here10k.xml",
      "scale":16249
    },
    {
      "name":"Here20k.xml",
      "scale":27499
    }
  ],
  "rotation": 0,
  "copyright": {
  	"font": {
      "name": "Helvetica",
      "size": {
      	"unit": "millimeter",
      	"value": 0.1
      },
      "color": {
      	"R": 0,
      	"G": 0,
      	"B": 0
      }
  	},
  	"anchor": "centertop",
  	"margin": {
      "width": {
      	"unit": "millimeter",
      	"value": 0.1
      },
      "height": {
      	"unit": "millimeter",
      	"value" 0.1
      }
  	}
  },
  "szhack": false,
  "preview": true
}
```



### metadata-basis

This objects represents a metadata-basis

##### Extends

- metadata

| Field       | Type    | Required | Description                       |
| ----------- | ------- | -------- | --------------------------------- |
| language    | string  | Yes      | Language of the map               |
| interactive | boolean | Yes      | Defines if the map is interactive |

```json
{
  "id": 1,
  "mapstyle": [
    {
      "name":"Here10k.xml",
      "scale":16249
    },
    {
      "name":"Here20k.xml",
      "scale":27499
    }
  ],
  "rotation": 0,
  "copyright": {
  	"font": {
      "name": "Helvetica",
      "size": {
      	"unit": "millimeter",
      	"value": 0.1
      },
      "color": {
      	"R": 0,
      	"G": 0,
      	"B": 0
      }
  	},
  	"anchor": "centertop",
  	"margin": {
      "width": {
      	"unit": "millimeter",
      	"value": 0.1
      },
      "height": {
      	"unit": "millimeter",
      	"value" 0.1
      }
  	}
  },
  "szhack": false,
  "preview": true,
  "interactive": false,
  "language": "eng"
}
```



### metadata-multilang

This object represents a metadata-multilang

##### Extends

- metadata

| Field     | Type            | Required | Description           |
| --------- | --------------- | -------- | --------------------- |
| languages | array of string | Yes      | Languages of the maps |

````json
{
  "id": 1,
  "mapstyle": [
    {
      "name":"Here10k.xml",
      "scale":16249
    },
    {
      "name":"Here20k.xml",
      "scale":27499
    }
  ],
  "rotation": 0,
  "copyright": {
  	"font": {
      "name": "Helvetica",
      "size": {
      	"unit": "millimeter",
      	"value": 0.1
      },
      "color": {
      	"R": 0,
      	"G": 0,
      	"B": 0
      }
  	},
  	"anchor": "centertop",
  	"margin": {
      "width": {
      	"unit": "millimeter",
      	"value": 0.1
      },
      "height": {
      	"unit": "millimeter",
      	"value" 0.1
      }
  	}
  },
  "szhack": false,
  "preview": true,
  "languages": [
    "eng",
    "dut",
    "fre",
    "fin"
  ]
}
````



### icon-label

This object represents an icon-label

| Field   | Type      | Required | Description                              |
| ------- | --------- | -------- | ---------------------------------------- |
| text    | string    | Yes      | Text that the label will contain         |
| font    | font      | Yes      | Font that the label will use             |
| textbox | textbox   | No       | Textbox that the text will be in         |
| anchor  | alignment | Yes      | Defines the place where the label needs to align, **keep in mind this is the place where the label will bind on the icon!** |
| margin  | dimension | No       | Offset/Margin from the icon. *Negative is on the label* |

```json
{
  "text": "Church",
  "font": {
    "name": "Helvetica",
    "size": {
      "unit": "millimeter",
      "value": 0.1
    },
    "color": {
      "R": 0,
      "G": 0,
      "B": 0
    }
  },
  "anchor": "topleft",
  "margin": {
    "width": {
      "unit": "millimeter",
      "size": 0.1
    },
    "height": {
      "unit": "millimeter",
      "size": 0.1
    }
  }
}
```



### icon

This object represents an icon based on SVG text

| Field    | Type       | Required | Description                              |
| -------- | ---------- | -------- | ---------------------------------------- |
| source   | string     | Yes      | Source string of the icon, **Keep in mind this needs to be the source of an SVG** |
| name     | string     | Yes      | Name of the label, *will be used in the POI-index* |
| category | string     | No       | Category of the icon, *will be used in the POI-index* |
| id       | integer    | Yes      | ID of the icon, needs to be unique, *will be used in the POI-index* |
| coord    | coordinate | Yes      | Coordinate where the icon will be placed |
| label    | icon-label | No       | Label that will be placed alongside the icon |

```json
{
  "source": "<svg xmlns=\"http:\/\/www.w3.org\/2000\/svg\" id=\"numbered_circle\" viewBox=\"-0.8399999618530274 -0.8399999618530274 5.879999732971191 5.879999732971191\" xml:space=\"preserve\" mol_dragallenabled=\"true\" mol_embed=\"true\" mol_svganchor=\"2.15 2.1\" mol_anchor=\"2.15 2.1\" mol_resizeenabled=\"true\" mol_edit_text=\"true\" mol_edit_style=\"true\" class=\"noselect\" width=\"5.879999732971191\" height=\"5.879999732971191\" visibility=\"visible\"><g id=\"scale\" transform=\"scale(1)\"><path id=\"Circle\" fill=\"#000000\" d=\"M 2.1 4.2 L 2.1 4.2 C 0.9 4.2 0 3.3 0 2.1 l 0 0 C 0 0.9 0.9 0 2.1 0 l 0 0 c 1.1 0 2.1 0.9 2.1 2.1 l 0 0 C 4.2 3.3 3.3 4.2 2.1 4.2 Z\" mol_edit_style=\"true\"\/><text mol_edit_style=\"true\" mol_edit_text=\"true\" font-family=\"Helvetica\" font-size=\"2.1\" font-style=\"normal\" font-weight=\"700\" fill=\"#ffffff\" text-anchor=\"middle\" x=\"2.15\" y=\"3\" mol_font=\"Helvetica-Bold\">2<\/text><\/g><\/svg>",
  "name": "2",
  "id": 0,
  "coord": {
    "coordSys": "wgs",
    "lat": 36.84167,
    "long": -2.46479
  }
}
```



### paper

This object represents a paper

| Field | Type      | Required | Description                              |
| ----- | --------- | -------- | ---------------------------------------- |
| size  | dimension | Yes      | Defines the size of the paper            |
| frame | line      | No       | Defines a frame that will be put around the map |

```json
{
  "size": {
    "width": {
      "unit": "millimeter",
      "value": 75
    },
    "height": "millimeter",
    "value": 50
  }
}
```



### map

This object represents a map

| Field           | Type              | Required | Description                              |
| --------------- | ----------------- | -------- | ---------------------------------------- |
| meta            | object            | Yes      | Defines the metadata, can either be **"metadata-basis"**, **"metadata-multilang"** |
| paper           | paper             | Yes      | Defines the paper the map will be on     |
| scaleDefinition | object            | Yes      | Defines the scale, can either be "boundingBox", "scale", "fromPois" |
| scalebar        | scalebar          | No       | Define the scalebar that will be put on the map |
| northIndicator  | northIndicator    | No       | Define the north indicator that will be put on the map |
| grid            | grid              | No       | Define a grid that will be put on the map |
| vectorLayers    | array of string   | No       | Define Vectorlayer(s) that will be put on the map |
| polylines       | array of polyline | No       | Define polyline(s) that will be put on the map |
| polygons        | array of polygon  | No       | Define polygon(s) that will be put on the map |
| icons           | array of icon     | No       | Define icon(s) that will be put on the map |
| labels          | array of label    | No       | Define label(s) that will be put on the map |
| output          | array of string   | Yes      | Set outputs that need to be generated, can either be "png", "pdf", "jpg", "svg", "eps", "bmp", "tif" |
| index           | array of string   | No       | Which indexes should be generated, can either be "city", "street", "poi". **Keep in mind the array should contain unique items** |

```json
{
  "id":46369,
  "command":"generate",
  "maps":[
    {
      "meta":{
        "id":46369,
        "mapstyle":[
          {
            "name":"Here10k.xml",
            "scale":16249
          },
          {
            "name":"Here20k.xml",
            "scale":27499
          },
          {
            "name":"Here40k.xml",
            "scale":47499
          },
          {
            "name":"Here75k.xml",
            "scale":92499
          },
          {
            "name":"Here150k.xml",
            "scale":177499
          },
          {
            "name":"Here300k.xml",
            "scale":412499
          },
          {
            "name":"Here600k.xml",
            "scale":749999
          },
          {
            "name":"Here1m.xml",
            "scale":1499999
          },
          {
            "name":"Here2m.xml",
            "scale":3749999
          },
          {
            "name":"Here5m.xml",
            "scale":7499999
          },
          {
            "name":"Here10m.xml",
            "scale":14999999
          },
          {
            "name":"Here20m.xml",
            "scale":30999999
          },
          {
            "name":"Here40m.xml",
            "scale":57499999
          },
          {
            "name":"Here75m.xml",
            "scale":87499999
          },
          {
            "name":"Here100m.xml",
            "scale":149999999
          },
          {
            "name":"Here200m.xml",
            "scale":249999999
          },
          {
            "name":"Here300m.xml",
            "scale":900000000
          }
        ],
        "interactive":false,
        "preview":true,
        "szhack":false,
        "language":"fin",
        "rotation":0,
        "copyright":{
          "font":{
            "fontsize":{
              "value":1.5,
              "unit":"millimeter"
            },
            "fontname":"ArialMT",
            "color":{
              "R":0,
              "G":0,
              "B":0
            }
          },
          "textbox":{
            "background":{
              "R":255,
              "G":255,
              "B":255
            }
          },
          "anchor":"bottomleft",
          "margin":{
            "width":{
              "value":0.5,
              "unit":"millimeter"
            },
            "height":{
              "value":0.5,
              "unit":"millimeter"
            }
          }
        }
      },
      "paper":{
        "size":{
          "width":{
            "value":306,
            "unit":"millimeter"
          },
          "height":{
            "value":240,
            "unit":"millimeter"
          }
        }
      },
      "output":[
        "eps"
      ],
      "scaleDefinition":{
        "downLeft":{
          "coordSys":"wgs",
          "lat":36.831291,
          "long":-2.469019
        },
        "upRight":{
          "coordSys":"wgs",
          "lat":36.842179,
          "long":-2.451618
        }
      }
    }
  ]
}
```

### job

This object represents a job. *A job can contain multiple maps, as long as they have the unique IDs*

| Field | Type         | Required | Description                              |
| ----- | ------------ | -------- | ---------------------------------------- |
| id    | integer      | Yes      | Unique Job ID.                           |
| maps  | array of map | Yes      | Maps connected to this Job. *Minimum of 1 |

```JSON
{
  "id":912,
  "command":"generate",
  "maps":[
    {
      "meta":{
        "id":912,
        "mapstyle":[
          {
            "name":"here5k.xml",
            "scale":7499
          },
          {
            "name":"here10k.xml",
            "scale":16249
          },
          {
            "name":"here20k.xml",
            "scale":27499
          },
          {
            "name":"here40k.xml",
            "scale":47499
          },
          {
            "name":"here75k.xml",
            "scale":92499
          },
          {
            "name":"here150k.xml",
            "scale":177499
          },
          {
            "name":"here300k.xml",
            "scale":412499
          },
          {
            "name":"here600k.xml",
            "scale":749999
          },
          {
            "name":"here1m.xml",
            "scale":1499999
          },
          {
            "name":"here2m.xml",
            "scale":3749999
          },
          {
            "name":"here5m.xml",
            "scale":7499999
          },
          {
            "name":"here10m.xml",
            "scale":14999999
          },
          {
            "name":"here20m.xml",
            "scale":30999999
          },
          {
            "name":"here40m.xml",
            "scale":57499999
          },
          {
            "name":"here75m.xml",
            "scale":87499999
          },
          {
            "name":"here100m.xml",
            "scale":149999999
          },
          {
            "name":"here200m.xml",
            "scale":249999999
          },
          {
            "name":"here300m.xml",
            "scale":900000000
          }
        ],
        "interactive":false,
        "preview":true,
        "szhack":false,
        "language":"eng",
        "rotation":0,
        "copyright":{
          "font":{
            "size":{
              "value":1.5,
              "unit":"millimeter"
            },
            "name":"ArialMT",
            "color":{
              "R":0,
              "G":0,
              "B":0
            }
          },
          "textbox":{
          },
          "margin":{
            "width":{
              "value":0.5,
              "unit":"millimeter"
            },
            "height":{
              "value":0.5,
              "unit":"millimeter"
            }
          },
          "anchor":"bottomleft"
        }
      },
      "paper":{
        "size":{
          "width":{
            "value":425,
            "unit":"point"
          },
          "height":{
            "value":283,
            "unit":"point"
          }
        }
      },
      "output":[
        "eps"
      ],
      "scaleDefinition":{
        "downLeft":{
          "coordsys":"wgs",
          "lat":48.699558,
          "long":1.9777
        },
        "upRight":{
          "coordsys":"wgs",
          "lat":49.048068,
          "long":2.771146
        }
      },
      "icons":[
      ],
      "polylines":[
      ]
    }
  ]
}
```

## response

### info

This object represents an info data response 

| Field   | Type   | Required | Description                              |
| ------- | ------ | -------- | ---------------------------------------- |
| state   | string | Yes      | State of the job, can either be: "parsing", "calculating" or "finishing" |
| message | string | Yes      | Message that explain what the job is doing |

```JSON
{
  "state": "queued",
  "message": "Job got queued"
}
```

### error

This object represents an error data response

| Field   | Type    | Required | Description                          |
| ------- | ------- | -------- | ------------------------------------ |
| state   | string  | Yes      | State of the job, is always "failed" |
| code    | integer | Yes      | Error code                           |
| message | string  | Yes      | Error message                        |

```JSON
{
  "state": "failed",
  "code": 400,
  "message": "Job not found"
}
```

### done  

This object represents a done data response

| Field   | Type   | Required | Description                            |
| ------- | ------ | -------- | -------------------------------------- |
| state   | string | Yes      | Is always done                         |
| url     | string | Yes      | Download url of the output             |
| preview | string | No       | Preview image of the map. *PNG format* |

```JSON
{
  "state": "done",
  "url": "http://example.com/archive.zip",
  "preview": "http://example.com/preview.png"
}
```

### Cancel

This object represents a cancel data response

| Field | Type   | Required | Description      |
| ----- | ------ | -------- | ---------------- |
| state | string | Yes      | Is always cancel |

```JSON
{
  "state": "cancel"
}
```

### response

This object represents a response

| Field | Type                               | Required | Description                 |
| ----- | ---------------------------------- | -------- | --------------------------- |
| id    | integer                            | Yes      | Job ID                      |
| data  | oneOf: "error, info, done, cancel" | Yes      | Data from the response type |

```JSON
{
  "id": 10,
  "state": "done",
  "url": "http://example.com/archive.zip",
  "preview": "http://example.com/preview.png"
}
```

## General information

### Polylines 
Polylines are encoded with the google polyline algorithm. Information about how to encode the polylines can be found [here](https://developers.google.com/maps/documentation/utilities/polylinealgorithm).
You can test the output of your program [here](https://developers.google.com/maps/documentation/utilities/polylineutility).


### Error codes
| Code | Message                     |
| ---- | --------------------------- |
| 400  | Job not found               |
| 500  | Couldn't parse JSON         |
| 501  | Element not found           |
| 502  | At least one element needed |
| 503  | Element not allowed         |

### Fonts

| fontname                      |
| ----------------------------- |
| Avantgarde                    |
| Koala-Normal                  |
| Cartosym-Color                |
| Courier                       |
| Helvetica                     |
| Times-Roman                   |
| Utopia                        |
| Gothic                        |
| Cartosym-Mono                 |
| Helvetica-Bold                |
| FrankfurtGothic-Normal        |
| FrankfurtGothic-Bold          |
| Cartosym-simple               |
| Frutiger-Roman                |
| Frutiger-Bold                 |
| Helvetica-Condensed-Bold      |
| AkzidenzGroteskBE-Md          |
| AkzidenzGroteskBE-Regular     |
| TrafficSign-Color             |
| FuturaStd-Book                |
| FuturaStd-Condensed           |
| FuturaStd-CondensedBold       |
| FuturaStd-CondensedOblique    |
| FuturaStd-Heavy               |
| FuturaStd-HeavyOblique        |
| FuturaStd-Medium              |
| FuturaStd-Bold                |
| Helvetica-Condensed-Light     |
| DTLCaspariTNews-Regular       |
| DTLCaspariTNews-Medium        |
| DTLCaspariTNews-Bold          |
| ClearfaceGothicLT-Bold        |
| ClearfaceGothicLT-Light       |
| Plantin-LightItalic           |
| BentonSansCond-Book           |
| ConduitITC-Light              |
| ConduitITC                    |
| ConduitITC-Medium             |
| ConduitITC-Bold               |
| Myriad-Bold                   |
| Myriad-Roman                  |
| Univers                       |
| Univers-Black                 |
| LegatoTF-Regular              |
| LegatoTF-Bold                 |
| LegatoTF-Light                |
| LegatoTF-SemiBold             |
| FrutigerLT-Bold               |
| FrutigerLT-BoldCn             |
| FrutigerLT-BlackCn            |
| Syntax-Roman                  |
| Syntax-Italic                 |
| Syntax-Bold                   |
| Syntax-Black                  |
| Syntax-UltraBlack             |
| HelveticaNeue-Condensed       |
| HelveticaNeue-BlackCond       |
| Frutiger-Cn                   |
| FlamaNewsBasic-Normal         |
| FlamaNewsBlack-Normal         |
| FlamaNews-Bold                |
| FlamaNewsBook-Normal          |
| FlamaNewsExtrabold-Normal     |
| BentonGothicCond-Bold         |
| BentonGothicCond-Regular      |
| StoneSans                     |
| TrebuchetItalic               |
| LegatoRZLF-Light              |
| AntennaCond-Bold              |
| AntennaCond-Regular           |
| PreloCondensed-Exbd           |
| PreloCondensed-Medium         |
| PreloSlab-ExBd                |
| WhitneyCondensed-Book         |
| ClanOT-Bold                   |
| ClanOT-News                   |
| Interstate-Bold               |
| Interstate-BoldCondensed      |
| Interstate-Light              |
| Interstate-Regular            |
| MillerText-RomanSC            |
| PoynterGothicText-Bold        |
| PoynterGothicText-Regular     |
| AntennaCond-Light             |
| FranklinNarrowITCStd-Bold     |
| FranklinNarrowITCStd-Light    |
| FranklinNarrowITCStd-Medium   |
| FrutigerLTStd-BlackCn         |
| FrutigerLTStd-BoldCn          |
| FrutigerLTStd-Cn              |
| DTLCaspariNewsTW-Regular      |
| DTLCaspariNewsTW-Bold         |
| DTLCaspariNewsTW-Italic       |
| DTLCaspariNewsTW-BoldItalic   |
| ClanOT-Book                   |
| SZoSansCond-Black             |
| SZoSansCond-Bold              |
| SZoSansCond-Medium            |
| SZoSansCond-Regular           |
| HelveticaNeueLTStd-BdCn       |
| HelveticaNeueLTStd-Cn         |
| Helvetica-Condensed           |
| HelveticaNeueLT-Roman         |
| HelveticaNeueLT-Bold          |
| HelveticaNeueLT-Light         |
| AGBookBQ-Regular              |
| AGBookBQ-Medium               |
| BebasNeue                     |
| BureauRoxyMedium              |
| LucidaConsole                 |
| Flama-Basic                   |
| Flama-Bold                    |
| MetaHeadline-Regular          |
| MetaHeadline-Bold             |
| MetaHeadline-Light            |
| Arial-Black                   |
| Arial-BoldMT                  |
| ArialMT                       |
| Museo-300                     |
| Museo-500                     |
| Museo-700                     |
| Stag-Medium                   |
| StagSans-Book                 |
| StagSans-Semibold             |
| Aller-Bold                    |
| Aller-Light                   |
| Calibre-Regular               |
| Calibre-Semibold              |
| NYTFranklin-Bold              |
| NYTFranklin-Headline          |
| NYTFranklin-Medium            |
| NYTFranklin-MediumItalic      |
| PoynterOSTextOneL-Italic      |
| TheSerifStarTribune-ExtraBold |
| TheSerifStarTribune           |
| GuardianSans-Bold             |
| GuardianSans-Regular          |
| GuardianTextSans-Bold         |
| GuardianTextSans-Regular      |
| TheSans-Plain                 |
| TheSansBold-Plain             |
| PAYBACK-Bold                  |
| PAYBACK-Regular               |
| OTFEtica-Bold                 |
| OTFEtica-Book                 |
| PAYBACK-Light                 |
| Caput-Bold                    |
| Caput-Regular                 |
| Humanist777BT-BoldB           |
| Humanist777BT-BoldCondensedB  |
| Humanist777BT-RomanCondensedB |
| GothamNarrow-Bold             |
| GothamNarrow-Book             |
| PoynterAgateOne-CompBold      |
| PoynterAgateZero-Cond         |
| HelveticaNeue-Light           |
| HelveticaNeue-Roman           |
| BoomerCond-Bold               |
| BoomerCond-Book               |
| BoomerExtraCond-Book          |
| AustinNewsDeck-Roman          |
| TelesansText-Bold             |
| TelesansText-Regular          |
| Graphik-Regular               |
| Graphik-Semibold              |
| HelveticaNeueLTStd-HvCn       |
| HelveticaNeueLTStd-MdCn       |
| HelsinginText-Regular         |
| Corpid                        |
| Corpid-Bold                   |
| Frutiger-BoldCn               |
| ArialNarrow-Bold              |
| Metric-Medium                 |
| Metric-Regular                |
| Metric-RegularItalic          |
| Metric-Semibold               |
| HelveticaNeueLT-MediumItalic  |
| FuturaTodayT02-Bold           |
| FuturaTodayT02-DemiBold       |
| FuturaTodayT02-Normal         |
| BentonSans-Bold               |
| BentonSansCond-Medium         |
| BentonSansCond-Regular        |
| Solido-Book                   |
| PoynterGothicText-BoldCond    |
| PoynterGothicText-RegCond     |
| AkzidenzGroteskBE-Bold        |
| CharterEFOP-BoldItalic        |
| CharterEFOP-Regular           |
| FoundersGrotesk-Regular       |
| FoundersGrotesk-Semibold      |
| CharterEFOP-Bold              |
| FranklinITCStd-Bold           |
| FranklinITCStd-Light          |
| MillerText-Italic             |
| StagSans-BookItalic           |
| StagSans-LightItalic          |
| StagSans-Medium               |
| TradeGothicLTStd-Light        |
| TradeGothicLTStd              |
| QuireSansPro-Italic           |
| QuireSansPro-Regular          |
| SourceSansPro-Bold            |
| SourceSansPro-Regular         |
| SourceSansPro-Semibold        |
| MunichRe-Medium               |
| MunichRe-Regular              |
| Metric-Light                  |
| AmplitudeCond-Bold            |
| AmplitudeCond-Regular         |
| AmplitudeCond-Book            |
| MinionPro-Bold                |
| MinionPro-Regular             |
| MinionPro-Semibold            |
| UnitPro-Bold                  |
| Gotham-Black                  |
| GothamCondensed-Black         |
| GothamXNarrow-Bold            |
| GothamXNarrow-Book            |
| GothamXNarrow-BookItalic      |
| FlamaSemicondensed-Bold       |
| FlamaSemicondensed-Book       |
| McClatchySans-Bold            |
| McClatchySans-Demi            |
| McClatchySans-Regular         |
| Balto-Bold                    |
| Balto-Book                    |
| Balto-Medium                  |
| GillSansMTPro-Book            |
| MyriadPro-Regular             |
