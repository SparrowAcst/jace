define("ace/mode/plant_uml_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"], function(require, exports, module) {
"use strict";

var oop = require("../lib/oop");
var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

var PlantUMLHighlightRules = function() {

    this.$rules = {
        start: [{
            token: "keyword.control.plantuml",
            regex: /^\s*(?:@startuml|@enduml)\b/
        }, {
            token: "variable.other.stereotype.plantuml",
            regex: /<<[\s\w]*>>/
        }, {
            token: "keyword.control.externalmsgs.plantuml",
            regex: /^\s*(?:\[(?:<--?|-?->)|(?:<--?|-?->)\])\s+/
        }, {
            token: "keyword.operator.plantuml",
            regex: /:|--/
        }, {
            token: "keyword.operator.relations.plantuml",
            regex: /(?:^|\s)(?:\*|o|<\|)?(?:-+(?:right|left|up|down))?-+(?:\*|o|\|>)?\s+/
        }, {
            token: "keyword.operator.dottedrelations.plantuml",
            regex: /(?:^|\s)(?:\*|o|<\|){0,2}(?:\.+(?:right|left|up|down))?\.+(?:\*|o|\|>){0,2}\s+/
        }, {
            token: "keyword.operator.arrows.plantuml",
            regex: /(?:^|\s)<{0,2}(?:-+(?:right|left|up|down))?-+>{0,2}\s+/
        }, {
            token: "keyword.operator.dottedarrows.plantuml",
            regex: /(?:^|\s)<{0,2}(?:\.+(?:right|left|up|down))?\.+>{0,2}\s+/
        }, {
            token: "keyword.operator.lines.plantuml",
            regex: /(?:^|\s)(?:-|\.)+\s+/
        }, {
            token: "keyword.control.divider.plantuml",
            regex: /^\s*==[\s\w]*==/
        }, {
            token: "keyword.control.synchronizationbar.plantuml",
            regex: /^\s*===[\s\w]*===/
        }, {
            token: "keyword.other.plantuml",
            regex: /\b(?:activate|again|also|alt|as|autonumber|bottom|box|break|center|create|critical|deactivate|destroy|down|else|end|endif|endwhile|footbox|footer|fork|group|header|hide|if|is|left|link|loop|namespace|newpage|note|of|on|opt|over|package|page|par|partition|ref|repeat|return|right|rotate|show|skin|skinparam|start|stop|title|top|top to bottom direction|up|while)\b/
        }, {
            token: "support.type.plantuml",
            regex: /^\s*(?:abstract|actor|agent|artifact|boundary|class|cloud|component|control|database|entity|enum|folder|frame|interface|node|object|participant|rect|state|storage|usecase)\b/,
            caseInsensitive: true
        }, {
            token: "constant.language.skinparameter.plantuml",
            regex: /\b(?:Activity2FontColor|Activity2FontName|Activity2FontSize|Activity2FontStyle|ActivityArrow2FontColor|ActivityArrow2FontName|ActivityArrow2FontSize|ActivityArrow2FontStyle|ActivityArrowColor|ActivityBackgroundColor|ActivityBarColor|ActivityBorderColor|ActivityEndColor|ActivityFontColor|ActivityFontName|ActivityFontSize|ActivityFontStyle|ActivityStartColor|ArtifactBackgroundColor|ArtifactBorderColor|BackgroundColor|BoundaryBackgroundColor|BoundaryBorderColor|CircledCharacterFontColor|CircledCharacterFontName|CircledCharacterFontSize|CircledCharacterFontStyle|CircledCharacterRadius|ClassArrowColor|ClassAttributeFontColor|ClassAttributeFontName|ClassAttributeFontSize|ClassAttributeFontStyle|ClassAttributeIconSize|ClassBackgroundColor|ClassBorderColor|ClassFontColor|ClassFontName|ClassFontSize|ClassFontStyle|ClassStereotypeFontColor|ClassStereotypeFontName|ClassStereotypeFontSize|ClassStereotypeFontStyle|CloudBackgroundColor|CloudBorderColor|ComponentBackgroundColor|ComponentBorderColor|ComponentFontColor|ComponentFontName|ComponentFontSize|ComponentFontStyle|ComponentInterfaceBackgroundColor|ComponentInterfaceBorderColor|ComponentStereotypeFontColor|ComponentStereotypeFontName|ComponentStereotypeFontSize|ComponentStereotypeFontStyle|ControlBackgroundColor|ControlBorderColor|DatabaseBackgroundColor|DatabaseBorderColor|DefaultFontColor|DefaultFontName|DefaultFontSize|DefaultFontStyle|EntityBackgroundColor|EntityBorderColor|FolderBackgroundColor|FolderBorderColor|FooterFontColor|FooterFontName|FooterFontSize|FooterFontStyle|FrameBackgroundColor|FrameBorderColor|GenericArrowFontColor|GenericArrowFontName|GenericArrowFontSize|GenericArrowFontStyle|HeaderFontColor|HeaderFontName|HeaderFontSize|HeaderFontStyle|IconPackageBackgroundColor|IconPackageColor|IconPrivateBackgroundColor|IconPrivateColor|IconProtectedBackgroundColor|IconProtectedColor|IconPublicBackgroundColor|IconPublicColor|LegendBackgroundColor|LegendBorderColor|LegendFontColor|LegendFontName|LegendFontSize|LegendFontStyle|Monochrome|NodeBackgroundColor|NodeBorderColor|NoteBackgroundColor|NoteBorderColor|NoteFontColor|NoteFontName|NoteFontSize|NoteFontStyle|ObjectArrowColor|ObjectAttributeFontColor|ObjectAttributeFontName|ObjectAttributeFontSize|ObjectAttributeFontStyle|ObjectBackgroundColor|ObjectBorderColor|ObjectFontColor|ObjectFontName|ObjectFontSize|ObjectFontStyle|ObjectStereotypeFontColor|ObjectStereotypeFontName|ObjectStereotypeFontSize|ObjectStereotypeFontStyle|PackageBackgroundColor|PackageBorderColor|PackageFontColor|PackageFontName|PackageFontSize|PackageFontStyle|PartitionBackgroundColor|PartitionBorderColor|RectangleBackgroundColor|RectangleBorderColor|SequenceActorBackgroundColor|SequenceActorBorderColor|SequenceActorFontColor|SequenceActorFontName|SequenceActorFontSize|SequenceActorFontStyle|SequenceArrowColor|SequenceArrowFontColor|SequenceArrowFontName|SequenceArrowFontSize|SequenceArrowFontStyle|SequenceBoxBackgroundColor|SequenceBoxBorderColor|SequenceBoxFontColor|SequenceBoxFontName|SequenceBoxFontSize|SequenceBoxFontStyle|SequenceDelayFontColor|SequenceDelayFontName|SequenceDelayFontSize|SequenceDelayFontStyle|SequenceDividerBackgroundColor|SequenceDividerFontColor|SequenceDividerFontName|SequenceDividerFontSize|SequenceDividerFontStyle|SequenceGroupBackgroundColor|SequenceGroupBorderColor|SequenceGroupFontColor|SequenceGroupFontName|SequenceGroupFontSize|SequenceGroupFontStyle|SequenceGroupHeaderFontColor|SequenceGroupHeaderFontName|SequenceGroupHeaderFontSize|SequenceGroupHeaderFontStyle|SequenceLifeLineBackgroundColor|SequenceLifeLineBorderColor|SequenceParticipantBackgroundColor|SequenceParticipantBorderColor|SequenceParticipantFontColor|SequenceParticipantFontName|SequenceParticipantFontSize|SequenceParticipantFontStyle|SequenceReferenceBackgroundColor|SequenceReferenceBorderColor|SequenceReferenceFontColor|SequenceReferenceFontName|SequenceReferenceFontSize|SequenceReferenceFontStyle|SequenceReferenceHeaderBackgroundColor|SequenceTitleFontColor|SequenceTitleFontName|SequenceTitleFontSize|SequenceTitleFontStyle|StateArrowColor|StateAttributeFontColor|StateAttributeFontName|StateAttributeFontSize|StateAttributeFontStyle|StateBackgroundColor|StateBorderColor|StateEndColor|StateFontColor|StateFontName|StateFontSize|StateFontStyle|StateStartColor|StereotypeABackgroundColor|StereotypeCBackgroundColor|StereotypeEBackgroundColor|StereotypeIBackgroundColor|StorageBackgroundColor|StorageBorderColor|TitleFontColor|TitleFontName|TitleFontSize|TitleFontStyle|UsecaseActorBackgroundColor|UsecaseActorBorderColor|UsecaseActorFontColor|UsecaseActorFontName|UsecaseActorFontSize|UsecaseActorFontStyle|UsecaseActorStereotypeFontColor|UsecaseActorStereotypeFontName|UsecaseActorStereotypeFontSize|UsecaseActorStereotypeFontStyle|UsecaseArrowColor|UsecaseBackgroundColor|UsecaseBorderColor|UsecaseFontColor|UsecaseFontName|UsecaseFontSize|UsecaseFontStyle|UsecaseStereotypeFontColor|UsecaseStereotypeFontName|UsecaseStereotypeFontSize|UsecaseStereotypeFontStyle)\b/,
            caseInsensitive: true
        }, {
            token: "constant.other.colors.plantuml",
            regex: /\s+#(?:AliceBlue|AntiqueWhite|Aqua|Aquamarine|Azure|Beige|Bisque|Black|BlanchedAlmond|Blue|BlueViolet|Brown|BurlyWood|CadetBlue|Chartreuse|Chocolate|Coral|CornflowerBlue|Cornsilk|Crimson|Cyan|DarkBlue|DarkCyan|DarkGoldenRod|DarkGray|DarkGreen|DarkGrey|DarkKhaki|DarkMagenta|DarkOliveGreen|DarkOrchid|DarkRed|DarkSalmon|DarkSeaGreen|DarkSlateBlue|DarkSlateGray|DarkSlateGrey|DarkTurquoise|DarkViolet|Darkorange|DeepPink|DeepSkyBlue|DimGray|DimGrey|DodgerBlue|FireBrick|FloralWhite|ForestGreen|Fuchsia|Gainsboro|GhostWhite|Gold|GoldenRod|Gray|Green|GreenYellow|Grey|HoneyDew|HotPink|IndianRed|Indigo|Ivory|Khaki|Lavender|LavenderBlush|LawnGreen|LemonChiffon|LightBlue|LightCoral|LightCyan|LightGoldenRodYellow|LightGray|LightGreen|LightGrey|LightPink|LightSalmon|LightSeaGreen|LightSkyBlue|LightSlateGray|LightSlateGrey|LightSteelBlue|LightYellow|Lime|LimeGreen|Linen|Magenta|Maroon|MediumAquaMarine|MediumBlue|MediumOrchid|MediumPurple|MediumSeaGreen|MediumSlateBlue|MediumSpringGreen|MediumTurquoise|MediumVioletRed|MidnightBlue|MintCream|MistyRose|Moccasin|NavajoWhite|Navy|OldLace|Olive|OliveDrab|Orange|OrangeRed|Orchid|PaleGoldenRod|PaleGreen|PaleTurquoise|PaleVioletRed|PapayaWhip|PeachPuff|Peru|Pink|Plum|PowderBlue|Purple|Red|RosyBrown|RoyalBlue|SaddleBrown|Salmon|SandyBrown|SeaGreen|SeaShell|Sienna|Silver|SkyBlue|SlateBlue|SlateGray|SlateGrey|Snow|SpringGreen|SteelBlue|Tan|Teal|Thistle|Tomato|Turquoise|Violet|Wheat|White|WhiteSmoke|Yellow|YellowGreen)\b/,
            caseInsensitive: true
        }, {
            token: "constant.numeric.hexcolors.plantuml",
            regex: /#[a-fA-F0-9]{6}/
        }, {
            token: "constant.language.symbols.plantuml",
            regex: /\[\*\]|\(\)|\(\*\)/
        }, {
            token: "string.quoted.double.plantuml",
            regex: /"/,
            push: [{
                token: "string.quoted.double.plantuml",
                regex: /"/,
                next: "pop"
            }, {
                token: "constant.character.escape.plantuml",
                regex: /\./
            }, {
                defaultToken: "string.quoted.double.plantuml"
            }]
        }]
    }
    
    this.normalizeRules();
};

PlantUMLHighlightRules.metaData = {
    fileTypes: ["txt", "iuml"],
    firstLineMatch: "@startuml",
    name: "PlantUML",
    scopeName: "source.plantuml",
    semanticClass: "text.plantuml"
}


oop.inherits(PlantUMLHighlightRules, TextHighlightRules);

exports.PlantUMLHighlightRules = PlantUMLHighlightRules;
});

define("ace/mode/folding/cstyle",["require","exports","module","ace/lib/oop","ace/range","ace/mode/folding/fold_mode"], function(require, exports, module) {
"use strict";

var oop = require("../../lib/oop");
var Range = require("../../range").Range;
var BaseFoldMode = require("./fold_mode").FoldMode;

var FoldMode = exports.FoldMode = function(commentRegex) {
    if (commentRegex) {
        this.foldingStartMarker = new RegExp(
            this.foldingStartMarker.source.replace(/\|[^|]*?$/, "|" + commentRegex.start)
        );
        this.foldingStopMarker = new RegExp(
            this.foldingStopMarker.source.replace(/\|[^|]*?$/, "|" + commentRegex.end)
        );
    }
};
oop.inherits(FoldMode, BaseFoldMode);

(function() {
    
    this.foldingStartMarker = /([\{\[\(])[^\}\]\)]*$|^\s*(\/\*)/;
    this.foldingStopMarker = /^[^\[\{\(]*([\}\]\)])|^[\s\*]*(\*\/)/;
    this.singleLineBlockCommentRe= /^\s*(\/\*).*\*\/\s*$/;
    this.tripleStarBlockCommentRe = /^\s*(\/\*\*\*).*\*\/\s*$/;
    this.startRegionRe = /^\s*(\/\*|\/\/)#?region\b/;
    this._getFoldWidgetBase = this.getFoldWidget;
    this.getFoldWidget = function(session, foldStyle, row) {
        var line = session.getLine(row);
    
        if (this.singleLineBlockCommentRe.test(line)) {
            if (!this.startRegionRe.test(line) && !this.tripleStarBlockCommentRe.test(line))
                return "";
        }
    
        var fw = this._getFoldWidgetBase(session, foldStyle, row);
    
        if (!fw && this.startRegionRe.test(line))
            return "start"; // lineCommentRegionStart
    
        return fw;
    };

    this.getFoldWidgetRange = function(session, foldStyle, row, forceMultiline) {
        var line = session.getLine(row);
        
        if (this.startRegionRe.test(line))
            return this.getCommentRegionBlock(session, line, row);
        
        var match = line.match(this.foldingStartMarker);
        if (match) {
            var i = match.index;

            if (match[1])
                return this.openingBracketBlock(session, match[1], row, i);
                
            var range = session.getCommentFoldRange(row, i + match[0].length, 1);
            
            if (range && !range.isMultiLine()) {
                if (forceMultiline) {
                    range = this.getSectionRange(session, row);
                } else if (foldStyle != "all")
                    range = null;
            }
            
            return range;
        }

        if (foldStyle === "markbegin")
            return;

        var match = line.match(this.foldingStopMarker);
        if (match) {
            var i = match.index + match[0].length;

            if (match[1])
                return this.closingBracketBlock(session, match[1], row, i);

            return session.getCommentFoldRange(row, i, -1);
        }
    };
    
    this.getSectionRange = function(session, row) {
        var line = session.getLine(row);
        var startIndent = line.search(/\S/);
        var startRow = row;
        var startColumn = line.length;
        row = row + 1;
        var endRow = row;
        var maxRow = session.getLength();
        while (++row < maxRow) {
            line = session.getLine(row);
            var indent = line.search(/\S/);
            if (indent === -1)
                continue;
            if  (startIndent > indent)
                break;
            var subRange = this.getFoldWidgetRange(session, "all", row);
            
            if (subRange) {
                if (subRange.start.row <= startRow) {
                    break;
                } else if (subRange.isMultiLine()) {
                    row = subRange.end.row;
                } else if (startIndent == indent) {
                    break;
                }
            }
            endRow = row;
        }
        
        return new Range(startRow, startColumn, endRow, session.getLine(endRow).length);
    };
    this.getCommentRegionBlock = function(session, line, row) {
        var startColumn = line.search(/\s*$/);
        var maxRow = session.getLength();
        var startRow = row;
        
        var re = /^\s*(?:\/\*|\/\/|--)#?(end)?region\b/;
        var depth = 1;
        while (++row < maxRow) {
            line = session.getLine(row);
            var m = re.exec(line);
            if (!m) continue;
            if (m[1]) depth--;
            else depth++;

            if (!depth) break;
        }

        var endRow = row;
        if (endRow > startRow) {
            return new Range(startRow, startColumn, endRow, line.length);
        }
    };

}).call(FoldMode.prototype);

});

define("ace/mode/plantuml",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/plant_uml_highlight_rules","ace/mode/folding/cstyle"], function(require, exports, module) {
"use strict";

var oop = require("../lib/oop");
var TextMode = require("./text").Mode;
var PlantUMLHighlightRules = require("./plant_uml_highlight_rules").PlantUMLHighlightRules;
var FoldMode = require("./folding/cstyle").FoldMode;

var Mode = function() {
    this.HighlightRules = PlantUMLHighlightRules;
};
oop.inherits(Mode, TextMode);

(function() {
    this.$id = "ace/mode/plant_uml"
}).call(Mode.prototype);

exports.Mode = Mode;
});
