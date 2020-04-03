var selectedAnswerId1 = "";
var fromInspection = false;
var renderingDiv = "";
var index = "";
var parentIndex = "";
var controlIndex = "";
var InspectionIndex = "";
var InspectionFieldIndex = "";
var InspectionControlIndex = "";
var currentSelectedStatusIndex = "";
var sectionIndex = "";
var multiLevelObject1 = {};
var multiLevelObject2 = {};
var objectArray = [];


function GetSetJsonMultilevelInputType1(type, caption, fieldsequence, id, selectedAnswerId1, fromInspection, currentSelectedVal = null, option = null) {
    debugger;
    var inputTypeData = new GetInputType(type, caption, fieldsequence, id, option);
    var isEmptyObject = $.isEmptyObject(multiLevelObject1);
    
    if (fromInspection) {
        if (currentSelectedVal == "P") {
            PInspectionInputTypeArray.push(inputTypeData);
            var currentIndex = PInspectionInputTypeArray.findIndex(m => m.Id == id);
            PInspectionInputTypeArray[currentIndex].FieldIndex = currentIndex;
        }
        else if (currentSelectedVal == "F") {
            FInspectionInputTypeArray.push(inputTypeData);
            var currentIndex = FInspectionInputTypeArray.findIndex(m => m.Id == id);
            FInspectionInputTypeArray[currentIndex].FieldIndex = currentIndex;
        }
    }
    else {
        if (!isEmptyObject) {
            index = multiLevelObject1.Answers.findIndex(m => m.Id == selectedAnswerId1);
            if (index > -1) {
                multiLevelObject1.Answers[index].MultiLevelInputTypeArray.push(inputTypeData);
            }
        }
        else {
            var listofindexes = GetGeneralIndex1();
            parentIndex = listofindexes.parentIndex; sectionIndex = listofindexes.sectionIndex;

            if (sectionIndex < 0 || sectionIndex == undefined) {
                objectArray = parentMultiLevelArray[parentIndex].Answers;
            }
            else {
                objectArray = SectionDataArray[sectionIndex].MultiLevelTypeArray[parentIndex].Answers;
            }

            index = objectArray.findIndex(m => m.Id == selectedAnswerId1);
            if (index > -1) {
                objectArray[index].MultiLevelInputTypeArray.push(inputTypeData);
            }
        }
    }
}

function GetSetJsonMultilevelAllInspectionControls1(name, InspectionControlDataArray, codestandard, fieldsequence, id, isMetaInfo, selectedAnswerId1) {
    var allInspectionControls = new GetAllInspectionControls(name, InspectionControlDataArray, codestandard, fieldsequence, id, isMetaInfo);

}

function EditInspectionControlFields1(isObjectEmpty, oldControlId, currentSelectedVal, controlCaption, controlOption) {
    debugger;

    var isFieldPrivate = true;
    var listofindexes = GetIndexes1(isObjectEmpty, oldControlId, true, currentSelectedVal);
    index = listofindexes.index; controlIndex = listofindexes.controlIndex; parentIndex = listofindexes.parentIndex;
    InspectionIndex = listofindexes.InspectionIndex; InspectionFieldIndex = listofindexes.InspectionFieldIndex;
    currentSelectedStatusIndex = listofindexes.currentSelectedStatusIndex;

    if (InspectionIndex > -1) {
        switch (currentSelectedVal) {
            case 'P':
                PInspectionInputTypeArray[InspectionIndex].Caption = controlCaption;
                PInspectionInputTypeArray[InspectionIndex].Option = controlOption;
                isFieldPrivate = PInspectionInputTypeArray[InspectionIndex].IsFieldPrivate;
                break;
            case 'F':
                FInspectionInputTypeArray[InspectionIndex].Caption = controlCaption;
                FInspectionInputTypeArray[InspectionIndex].Option = controlOption;
                isFieldPrivate = FInspectionInputTypeArray[InspectionIndex].IsFieldPrivate;
                break;
            default: break;
        }
    }
    else {
        if (!isObjectEmpty) {
            multiLevelObject1.Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].InspectionControlArray[currentSelectedStatusIndex].InspectionInputTypeArray[InspectionFieldIndex].Caption = controlCaption;
            multiLevelObject1.Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].InspectionControlArray[currentSelectedStatusIndex].InspectionInputTypeArray[InspectionFieldIndex].Option = controlOption;
            isFieldPrivate = multiLevelObject1.Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].InspectionControlArray[currentSelectedStatusIndex].InspectionInputTypeArray[InspectionFieldIndex].IsFieldPrivate;
        }
        else {
            if (sectionIndex < 0 || sectionIndex == undefined) {
                parentMultiLevelArray[parentIndex].Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].InspectionControlArray[currentSelectedStatusIndex].InspectionInputTypeArray[InspectionFieldIndex].Caption = controlCaption;
                parentMultiLevelArray[parentIndex].Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].InspectionControlArray[currentSelectedStatusIndex].InspectionInputTypeArray[InspectionFieldIndex].Option = controlOption;
                isFieldPrivate = parentMultiLevelArray[parentIndex].Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].InspectionControlArray[currentSelectedStatusIndex].InspectionInputTypeArray[InspectionFieldIndex].IsFieldPrivate;
            }
            else {
                SectionDataArray[sectionIndex].MultiLevelTypeArray[parentIndex].Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].InspectionControlArray[currentSelectedStatusIndex].InspectionInputTypeArray[InspectionFieldIndex].Caption = controlCaption;
                SectionDataArray[sectionIndex].MultiLevelTypeArray[parentIndex].Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].InspectionControlArray[currentSelectedStatusIndex].InspectionInputTypeArray[InspectionFieldIndex].Option = controlOption;
                isFieldPrivate = SectionDataArray[sectionIndex].MultiLevelTypeArray[parentIndex].Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].InspectionControlArray[currentSelectedStatusIndex].InspectionInputTypeArray[InspectionFieldIndex].IsFieldPrivate;
            }
        }
    }
    return isFieldPrivate;
}

function ClearMultilevelInspectionControls1() {
    debugger;
    InspectionControlDataArray = [];
    MultilevelInspectionInputTypeDataArray = [];
    PInspectionInputTypeArray = [];
    FInspectionInputTypeArray = [];
    $('.Multilevel_Inspection_Control_container #dvPparent,' +
        '.Multilevel_Inspection_Control_container #dvFparent').removeClass().addClass("inspectioncontent");
    $(".Multilevel_Inspection_Control_container #dvP, .Multilevel_Inspection_Control_container #dvF").empty();
}

function GetIndexes1(isObjectEmpty, controlId, fromInspection = false, currentSelectedStatus = null, level = 0) {
    debugger;
    if (!fromInspection) {
        if (!isObjectEmpty) {
            index = multiLevelObject1.Answers.findIndex(m => m.Id == selectedAnswerId1);
            if (index > -1) {
                controlIndex = multiLevelObject1.Answers[index].MultiLevelInputTypeArray.findIndex(m => m.Id == controlId);
                if (controlIndex > -1) {
                    return {
                        index: index,
                        controlIndex: controlIndex
                    }
                }
            }
        }
        else {
            var parentId = $("#hdnParentMultilevelId1").val();
            parentIndex = parentMultiLevelArray.findIndex(m => m.Id == parentId);
            if (parentIndex > -1) {
                index = parentMultiLevelArray[parentIndex].Answers.findIndex(m => m.Id == selectedAnswerId1);
                if (index > -1) {
                    controlIndex = parentMultiLevelArray[parentIndex].Answers[index].MultiLevelInputTypeArray.findIndex(m => m.Id == controlId);
                    if (controlIndex > -1) {
                        return {
                            index: index,
                            controlIndex: controlIndex,
                            parentIndex: parentIndex
                        }
                    }
                }
            }
            else {
                var sectionId = $("#OldSectionId").val();
                sectionIndex = SectionDataArray.findIndex(m => m.Id == sectionId);
                if (sectionIndex > -1) {
                    var parentId = $("#hdnParentMultilevelId1").val();
                    parentIndex = SectionDataArray[sectionIndex].MultiLevelTypeArray.findIndex(m => m.Id == parentId);
                    if (parentIndex > -1) {
                        index = SectionDataArray[sectionIndex].MultiLevelTypeArray[parentIndex].Answers.findIndex(m => m.Id == selectedAnswerId1);
                        if (index > -1) {
                            controlIndex = SectionDataArray[sectionIndex].MultiLevelTypeArray[parentIndex].Answers[index].MultiLevelInputTypeArray.findIndex(m => m.Id == controlId);
                            if (controlIndex > -1) {
                                return {
                                    index: index,
                                    controlIndex: controlIndex,
                                    parentIndex: parentIndex,
                                    sectionIndex: sectionIndex
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    else {
        if (currentSelectedStatus == "P") {
            currentSelectedStatusIndex = 0;
            InspectionIndex = PInspectionInputTypeArray.findIndex(m => m.Id == controlId);
        }
        else {
            currentSelectedStatusIndex = 1;
            InspectionIndex = FInspectionInputTypeArray.findIndex(m => m.Id == controlId);
        }

        if (InspectionIndex > -1) {
            return { InspectionIndex: InspectionIndex }
        }
        else {
            if (!isObjectEmpty) {
                index = multiLevelObject1.Answers.findIndex(m => m.Id == selectedAnswerId1);
                if (index > -1) {
                    controlIndex = multiLevelObject1.Answers[index].MultiLevelInspectionInputTypeArray.findIndex(m => m.Id == InspectionControlId);
                    if (controlIndex > -1) {
                        InspectionFieldIndex = multiLevelObject1.Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].InspectionControlArray[currentSelectedStatusIndex].InspectionInputTypeArray.findIndex(m => m.Id == controlId);
                        if (InspectionFieldIndex > -1) {
                            return {
                                index: index,
                                controlIndex: controlIndex,
                                InspectionFieldIndex: InspectionFieldIndex,
                                currentSelectedStatusIndex: currentSelectedStatusIndex
                            }
                        }
                    }
                }
            }
            else {
                var parentId = $("#hdnParentMultilevelId1").val();
                parentIndex = parentMultiLevelArray.findIndex(m => m.Id == parentId);
                if (parentIndex > -1) {
                    index = parentMultiLevelArray[parentIndex].Answers.findIndex(m => m.Id == selectedAnswerId1);
                    if (index > -1) {
                        controlIndex = parentMultiLevelArray[parentIndex].Answers[index].MultiLevelInspectionInputTypeArray.findIndex(m => m.Id == InspectionControlId);
                        if (controlIndex > -1) {
                            InspectionFieldIndex = parentMultiLevelArray[parentIndex].Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].InspectionControlArray[currentSelectedStatusIndex].InspectionInputTypeArray.findIndex(m => m.Id == controlId);
                            if (InspectionFieldIndex > -1) {
                                return {
                                    index: index,
                                    controlIndex: controlIndex,
                                    parentIndex: parentIndex,
                                    InspectionFieldIndex: InspectionFieldIndex,
                                    currentSelectedStatusIndex: currentSelectedStatusIndex
                                }
                            }
                        }
                    }
                }
                else {
                    var sectionId = $("#OldSectionId").val();
                    sectionIndex = SectionDataArray.findIndex(m => m.Id == sectionId);
                    if (sectionIndex > -1) {
                        var parentId = $("#hdnParentMultilevelId1").val();
                        parentIndex = SectionDataArray[sectionIndex].MultiLevelTypeArray.findIndex(m => m.Id == parentId);
                        if (parentIndex > -1) {
                            index = SectionDataArray[sectionIndex].MultiLevelTypeArray[parentIndex].Answers.findIndex(m => m.Id == selectedAnswerId1);
                            if (index > -1) {
                                controlIndex = SectionDataArray[sectionIndex].MultiLevelTypeArray[parentIndex].Answers[index].MultiLevelInspectionInputTypeArray.findIndex(m => m.Id == InspectionControlId);
                                if (controlIndex > -1) {
                                    InspectionFieldIndex = SectionDataArray[sectionIndex].MultiLevelTypeArray[parentIndex].Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].InspectionControlArray[currentSelectedStatusIndex].InspectionInputTypeArray.findIndex(m => m.Id == controlId);
                                    if (InspectionFieldIndex > -1) {
                                        return {
                                            index: index,
                                            controlIndex: controlIndex,
                                            parentIndex: parentIndex,
                                            InspectionFieldIndex: InspectionFieldIndex,
                                            currentSelectedStatusIndex: currentSelectedStatusIndex,
                                            sectionIndex: sectionIndex
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

function GetGeneralIndex1() {
    var parentId = $("#hdnParentMultilevelId1").val();
    parentIndex = parentMultiLevelArray.findIndex(m => m.Id == parentId);
    if (parentIndex > -1) {
        return {
            parentIndex: parentIndex
        }
    }
    else {
        var sectionId = $("#OldSectionId").val();
        sectionIndex = SectionDataArray.findIndex(m => m.Id == sectionId);
        if (sectionIndex > -1) {
            var parentId = $("#hdnParentMultilevelId1").val();
            parentIndex = SectionDataArray[sectionIndex].MultiLevelTypeArray.findIndex(m => m.Id == parentId);
            if (parentIndex > -1) {
                return {
                    sectionIndex: sectionIndex,
                    parentIndex: parentIndex
                }
            }
        }
    }
}

function GetMultilevelInspectionIndex(currentSelectedStatus = '') {
    var arrayLength = 0;
    debugger;
    switch (currentSelectedStatus) {
        case 'P': currentSelectedStatusIndex = 0;
            arrayLength = PInspectionInputTypeArray.length;
            InspectionIndex = 0;
            break;
        case 'F': currentSelectedStatusIndex = 1;
            arrayLength = FInspectionInputTypeArray.length;
            InspectionIndex = 0;
            break;
        default: break;
    }

    if (arrayLength > 0) {
        return { InspectionIndex: InspectionIndex }
    }
    else {
        var levelId = $("#hdnInspectionControlLevelId").val();
        if (levelId == "InspectionControlLevel1") {
            isObjectEmpty = $.isEmptyObject(multiLevelObject1);
            if (!isObjectEmpty) {
                index = multiLevelObject1.Answers.findIndex(m => m.Id == selectedAnswerId1);
                if (index > -1) {
                    controlIndex = multiLevelObject1.Answers[index].MultiLevelInspectionInputTypeArray.findIndex(m => m.Id == InspectionControlId);
                    if (controlIndex > -1) {
                        return {
                            index: index,
                            controlIndex: controlIndex,
                            currentSelectedStatusIndex: currentSelectedStatusIndex
                        }
                    }
                }
            }
            else {
                var parentId = $("#hdnParentMultilevelId1").val();
                parentIndex = parentMultiLevelArray.findIndex(m => m.Id == parentId);
                if (parentIndex > -1) {
                    index = parentMultiLevelArray[parentIndex].Answers.findIndex(m => m.Id == selectedAnswerId1);
                    if (index > -1) {
                        controlIndex = parentMultiLevelArray[parentIndex].Answers[index].MultiLevelInspectionInputTypeArray.findIndex(m => m.Id == InspectionControlId);
                        if (controlIndex > -1) {
                            return {
                                index: index,
                                controlIndex: controlIndex,
                                currentSelectedStatusIndex: currentSelectedStatusIndex,
                                parentIndex: parentIndex
                            }
                        }
                    }
                }
                else {
                    var sectionId = $("#OldSectionId").val();
                    sectionIndex = SectionDataArray.findIndex(m => m.Id == sectionId);
                    if (sectionIndex > -1) {
                        var parentId = $("#hdnParentMultilevelId1").val();
                        parentIndex = SectionDataArray[sectionIndex].MultiLevelTypeArray.findIndex(m => m.Id == parentId);
                        if (parentIndex > -1) {
                            index = SectionDataArray[sectionIndex].MultiLevelTypeArray[parentIndex].Answers.findIndex(m => m.Id == selectedAnswerId1);
                            if (index > -1) {
                                controlIndex = SectionDataArray[sectionIndex].MultiLevelTypeArray[parentIndex].Answers[index].MultiLevelInspectionInputTypeArray.findIndex(m => m.Id == InspectionControlId);
                                if (controlIndex > -1) {
                                    return {
                                        index: index,
                                        controlIndex: controlIndex,
                                        currentSelectedStatusIndex: currentSelectedStatusIndex,
                                        parentIndex: parentIndex,
                                        sectionIndex: sectionIndex
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        else if (levelId == "InspectionControlLevel2") {
            isObjectEmpty = $.isEmptyObject(multiLevelObject2);
            if (!isObjectEmpty) {
                index = multiLevelObject2.Answers.findIndex(m => m.Id == selectedAnswerId2);
                if (index > -1) {
                    controlIndex = multiLevelObject2.Answers[index].MultiLevelInspectionInputTypeArray.findIndex(m => m.Id == InspectionControlId);
                    if (controlIndex > -1) {
                        return {
                            index: index,
                            controlIndex: controlIndex,
                            currentSelectedStatusIndex: currentSelectedStatusIndex
                        }
                    }
                }
            }
            else {
                var IsLevel1ObjectEmpty = $.isEmptyObject(multiLevelObject1);
                if (!IsLevel1ObjectEmpty) {
                    Level1AnswerIndex = $("#hdnLevel1AnswerIndex").val();
                    Level2QuestionIndex = $("#hdnLevel2QuestionIndex").val();
                    index = multiLevelObject1.Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers.findIndex(m => m.Id == selectedAnswerId2);
                    if (index > -1) {
                        controlIndex = multiLevelObject1.Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[index].MultiLevelInspectionInputTypeArray.findIndex(m => m.Id == InspectionControlId);
                        if (controlIndex > -1) {
                            return {
                                index: index,
                                controlIndex: controlIndex,
                                currentSelectedStatusIndex: currentSelectedStatusIndex,
                                Level1AnswerIndex: Level1AnswerIndex,
                                Level2QuestionIndex: Level2QuestionIndex
                            }
                        }
                    }
                }
                else {
                    var parentId = $("#hdnParentMultilevelId1").val();
                    parentIndex = parentMultiLevelArray.findIndex(m => m.Id == parentId);
                    if (parentIndex > -1) {
                        Level1AnswerIndex = $("#hdnLevel1AnswerIndex").val();
                        Level2QuestionIndex = $("#hdnLevel2QuestionIndex").val();
                        index = parentMultiLevelArray[parentIndex].Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers.findIndex(m => m.Id == selectedAnswerId2);
                        if (index > -1) {
                            controlIndex = parentMultiLevelArray[parentIndex].Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[index].MultiLevelInspectionInputTypeArray.findIndex(m => m.Id == InspectionControlId);
                            if (controlIndex > -1) {
                                return {
                                    index: index,
                                    controlIndex: controlIndex,
                                    currentSelectedStatusIndex: currentSelectedStatusIndex,
                                    Level1AnswerIndex: Level1AnswerIndex,
                                    Level2QuestionIndex: Level2QuestionIndex,
                                    parentIndex: parentIndex
                                }
                            }
                        }
                    }
                    else {
                        var sectionId = $("#OldSectionId").val();
                        sectionIndex = SectionDataArray.findIndex(m => m.Id == sectionId);
                        if (sectionIndex > -1) {
                            var parentId = $("#hdnParentMultilevelId1").val();
                            parentIndex = SectionDataArray[sectionIndex].MultiLevelTypeArray.findIndex(m => m.Id == parentId);
                            if (parentIndex > -1) {
                                Level1AnswerIndex = $("#hdnLevel1AnswerIndex").val();
                                Level2QuestionIndex = $("#hdnLevel2QuestionIndex").val();
                                index = SectionDataArray[sectionIndex].MultiLevelTypeArray[parentIndex].Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers.findIndex(m => m.Id == selectedAnswerId2);
                                if (index > -1) {
                                    controlIndex = SectionDataArray[sectionIndex].MultiLevelTypeArray[parentIndex].Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[index].MultiLevelInspectionInputTypeArray.findIndex(m => m.Id == InspectionControlId);
                                    if (controlIndex > -1) {
                                        return {
                                            index: index,
                                            controlIndex: controlIndex,
                                            currentSelectedStatusIndex: currentSelectedStatusIndex,
                                            Level1AnswerIndex: Level1AnswerIndex,
                                            Level2QuestionIndex: Level2QuestionIndex,
                                            parentIndex: parentIndex,
                                            sectionIndex: sectionIndex
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        else if (levelId == "InspectionControlLevel3") {
            isObjectEmpty = $.isEmptyObject(multiLevelObject3);
            if (!isObjectEmpty) {
                index = multiLevelObject3.Answers.findIndex(m => m.Id == selectedAnswerId3);
                if (index > -1) {
                    controlIndex = multiLevelObject3.Answers[index].MultiLevelInspectionInputTypeArray.findIndex(m => m.Id == InspectionControlId);
                    if (controlIndex > -1) {
                        return {
                            index: index,
                            controlIndex: controlIndex,
                            currentSelectedStatusIndex: currentSelectedStatusIndex
                        }
                    }
                }
            }
            else {
                var IsLevel2ObjectEmpty = $.isEmptyObject(multiLevelObject2);
                if (!IsLevel2ObjectEmpty) {
                    Level2AnswerIndex = $("#hdnLevel2AnswerIndex").val();
                    Level3QuestionIndex = $("#hdnLevel3QuestionIndex").val();
                    index = multiLevelObject2.Answers[Level2AnswerIndex].MultiLevelArray[Level3QuestionIndex].Answers.findIndex(m => m.Id == selectedAnswerId3);
                    if (index > -1) {
                        controlIndex = multiLevelObject2.Answers[Level2AnswerIndex].MultiLevelArray[Level3QuestionIndex].Answers[index].MultiLevelInspectionInputTypeArray.findIndex(m => m.Id == InspectionControlId);
                        if (controlIndex > -1) {
                            return {
                                index: index,
                                controlIndex: controlIndex,
                                currentSelectedStatusIndex: currentSelectedStatusIndex,
                                Level2AnswerIndex: Level2AnswerIndex,
                                Level3QuestionIndex: Level3QuestionIndex
                            }
                        }
                    }
                }
                else {
                    var IsLevel1ObjectEmpty = $.isEmptyObject(multiLevelObject1);
                    if (!IsLevel1ObjectEmpty) {
                        Level1AnswerIndex = $("#hdnLevel1AnswerIndex").val();
                        Level2QuestionIndex = $("#hdnLevel2QuestionIndex").val();
                        Level2AnswerIndex = $("#hdnLevel2AnswerIndex").val();
                        Level3QuestionIndex = $("#hdnLevel3QuestionIndex").val();
                        index = multiLevelObject1.Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[Level2AnswerIndex].MultiLevelArray[Level3QuestionIndex].Answers.findIndex(m => m.Id == selectedAnswerId3);
                        if (index > -1) {
                            controlIndex = multiLevelObject1.Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[Level2AnswerIndex].MultiLevelArray[Level3QuestionIndex].Answers[index].MultiLevelInspectionInputTypeArray.findIndex(m => m.Id == InspectionControlId);
                            if (controlIndex > -1) {
                                return {
                                    index: index,
                                    controlIndex: controlIndex,
                                    currentSelectedStatusIndex: currentSelectedStatusIndex,
                                    Level1AnswerIndex: Level1AnswerIndex,
                                    Level2QuestionIndex: Level2QuestionIndex,
                                    Level2AnswerIndex: Level2AnswerIndex,
                                    Level3QuestionIndex: Level3QuestionIndex
                                }
                            }
                        }
                    }
                    else {
                        var parentId = $("#hdnParentMultilevelId1").val();
                        parentIndex = parentMultiLevelArray.findIndex(m => m.Id == parentId);
                        if (parentIndex > -1) {
                            Level1AnswerIndex = $("#hdnLevel1AnswerIndex").val();
                            Level2QuestionIndex = $("#hdnLevel2QuestionIndex").val();
                            Level2AnswerIndex = $("#hdnLevel2AnswerIndex").val();
                            Level3QuestionIndex = $("#hdnLevel3QuestionIndex").val();
                            index = parentMultiLevelArray[parentIndex].Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[Level2AnswerIndex].MultiLevelArray[Level3QuestionIndex].Answers.findIndex(m => m.Id == selectedAnswerId3);
                            if (index > -1) {
                                controlIndex = parentMultiLevelArray[parentIndex].Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[Level2AnswerIndex].MultiLevelArray[Level3QuestionIndex].Answers[index].MultiLevelInspectionInputTypeArray.findIndex(m => m.Id == InspectionControlId);
                                if (controlIndex > -1) {
                                    return {
                                        index: index,
                                        controlIndex: controlIndex,
                                        currentSelectedStatusIndex: currentSelectedStatusIndex,
                                        Level1AnswerIndex: Level1AnswerIndex,
                                        Level2QuestionIndex: Level2QuestionIndex,
                                        Level2AnswerIndex: Level2AnswerIndex,
                                        Level3QuestionIndex: Level3QuestionIndex,
                                        parentIndex: parentIndex
                                    }
                                }
                            }
                        }
                        else {
                            var sectionId = $("#OldSectionId").val();
                            sectionIndex = SectionDataArray.findIndex(m => m.Id == sectionId);
                            if (sectionIndex > -1) {
                                var parentId = $("#hdnParentMultilevelId1").val();
                                parentIndex = SectionDataArray[sectionIndex].MultiLevelTypeArray.findIndex(m => m.Id == parentId);
                                if (parentIndex > -1) {
                                    Level1AnswerIndex = $("#hdnLevel1AnswerIndex").val();
                                    Level2QuestionIndex = $("#hdnLevel2QuestionIndex").val();
                                    Level2AnswerIndex = $("#hdnLevel2AnswerIndex").val();
                                    Level3QuestionIndex = $("#hdnLevel3QuestionIndex").val();
                                    index = SectionDataArray[sectionIndex].MultiLevelTypeArray[parentIndex].Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[Level2AnswerIndex].MultiLevelArray[Level3QuestionIndex].Answers.findIndex(m => m.Id == selectedAnswerId3);
                                    if (index > -1) {
                                        controlIndex = SectionDataArray[sectionIndex].MultiLevelTypeArray[parentIndex].Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[Level2AnswerIndex].MultiLevelArray[Level3QuestionIndex].Answers[index].MultiLevelInspectionInputTypeArray.findIndex(m => m.Id == InspectionControlId);
                                        if (controlIndex > -1) {
                                            return {
                                                index: index,
                                                controlIndex: controlIndex,
                                                currentSelectedStatusIndex: currentSelectedStatusIndex,
                                                Level1AnswerIndex: Level1AnswerIndex,
                                                Level2QuestionIndex: Level2QuestionIndex,
                                                Level2AnswerIndex: Level2AnswerIndex,
                                                Level3QuestionIndex: Level3QuestionIndex,
                                                parentIndex: parentIndex,
                                                sectionIndex: sectionIndex
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

function GetGeneralIndex1() {
    var parentId = $("#hdnParentMultilevelId1").val();
    parentIndex = parentMultiLevelArray.findIndex(m => m.Id == parentId);
    if (parentIndex > -1) {
        return {
            parentIndex: parentIndex
        }
    }
    else {
        var sectionId = $("#OldSectionId").val();
        sectionIndex = SectionDataArray.findIndex(m => m.Id == sectionId);
        if (sectionIndex > -1) {
            var parentId = $("#hdnParentMultilevelId1").val();
            parentIndex = SectionDataArray[sectionIndex].MultiLevelTypeArray.findIndex(m => m.Id == parentId);
            if (parentIndex > -1) {
                return {
                    sectionIndex: sectionIndex,
                    parentIndex: parentIndex
                }
            }
        }
    }
}

function SortingLevel1() {
    debugger;
    var isEmptyObject = $.isEmptyObject(multiLevelObject1);
    //var objectArray = [];

    if (!isEmptyObject) {
        objectArray = multiLevelObject1.Answers;
    }
    else {
        var listofindexes = GetGeneralIndex1();
        parentIndex = listofindexes.parentIndex; sectionIndex = listofindexes.sectionIndex;

        if (sectionIndex < 0 || sectionIndex == undefined) {
            objectArray = parentMultiLevelArray[parentIndex].Answers;
        }
        else {
            objectArray = SectionDataArray[sectionIndex].MultiLevelTypeArray[parentIndex].Answers;
        }
    }

    var divIds = $.map($(".multilevel_fields_container_1").children("div[id]"), function (e, i) {
        return $(e).attr('id');
    });

    $.each(divIds, function (divIndex) {
        debugger;
        var currentDivId = divIds[divIndex];
        var controlArray = $(".multilevel_fields_container_1 #" + currentDivId).sortable("toArray");
       
       
        for (var i = 0; i < controlArray.length; i++) {
            $.each(objectArray, function (answerIndex) {
                var fieldIndex = objectArray[answerIndex].MultiLevelInputTypeArray.findIndex(m => m.Id == controlArray[i]);
                if (fieldIndex > -1) {
                    objectArray[answerIndex].MultiLevelInputTypeArray[fieldIndex].FieldSequence = i + 1;
                }
                else {
                    var inspectionIndex = objectArray[answerIndex].MultiLevelInspectionInputTypeArray.findIndex(m => m.Id == controlArray[i]);
                    if (inspectionIndex > -1) {
                        objectArray[answerIndex].MultiLevelInspectionInputTypeArray[inspectionIndex].FieldSequence = i + 1;
                    }
                    else {
                        var multilevelIndex = objectArray[answerIndex].MultiLevelArray.findIndex(m => m.Id == controlArray[i]);
                        if (multilevelIndex > -1) {
                            objectArray[answerIndex].MultiLevelArray[multilevelIndex].FieldSequence = i + 1;
                        }
                    }
                }
            });
        }
    });
}

function SortingInspectionComponents(isInspectionControlforEdit) {
    debugger;
    var PSortedOrder = $(".Multilevel_Inspection_Control_container #dvP").sortable("toArray");
    var FSortedOrder = $(".Multilevel_Inspection_Control_container #dvF").sortable("toArray");
    var SortedOrder = $.merge(PSortedOrder, FSortedOrder);

    if (isInspectionControlforEdit) {
        var listofIndexes = GetMultilevelInspectionIndex('');
        Level2AnswerIndex = listofIndexes.Level2AnswerIndex; Level3QuestionIndex = listofIndexes.Level3QuestionIndex;
        Level1AnswerIndex = listofIndexes.Level1AnswerIndex; Level2QuestionIndex = listofIndexes.Level2QuestionIndex;
        InspectionIndex = listofIndexes.InspectionIndex; index = listofIndexes.index; controlIndex = listofIndexes.controlIndex;
        parentIndex = listofIndexes.parentIndex;
        sectionIndex = listofIndexes.sectionIndex;


        for (var j = 0; j <= 1; j++) {
            var counter = 1;
            for (var i = 0; i < SortedOrder.length; i++) {

                var levelId = $("#hdnInspectionControlLevelId").val();
                if (levelId == "InspectionControlLevel1") {
                    isObjectEmpty = $.isEmptyObject(multiLevelObject1);
                    if (!isObjectEmpty) {
                        objectArray = multiLevelObject1.Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].InspectionControlArray[j].InspectionInputTypeArray;
                    }
                    else {
                        if (sectionIndex < 0 || sectionIndex == undefined) {
                            objectArray = parentMultiLevelArray[parentIndex].Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].InspectionControlArray[j].InspectionInputTypeArray;
                        }
                        else {
                            objectArray = SectionDataArray[sectionIndex].MultiLevelTypeArray[parentIndex].Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].InspectionControlArray[j].InspectionInputTypeArray;
                        }
                    }
                }
                else if (levelId == "InspectionControlLevel2") {
                    isObjectEmpty = $.isEmptyObject(multiLevelObject2);
                    if (!isObjectEmpty) {
                        objectArray = multiLevelObject2.Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].InspectionControlArray[j].InspectionInputTypeArray;
                    }
                    else {
                        var IsLevel1ObjectEmpty = $.isEmptyObject(multiLevelObject1);
                        if (!IsLevel1ObjectEmpty) {
                            objectArray = multiLevelObject1.Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].InspectionControlArray[j].InspectionInputTypeArray;
                        }
                        else {
                            if (sectionIndex < 0 || sectionIndex == undefined) {
                                objectArray = parentMultiLevelArray[parentIndex].Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].InspectionControlArray[j].InspectionInputTypeArray;
                            }
                            else {
                                objectArray = SectionDataArray[sectionIndex].MultiLevelTypeArray[parentIndex].Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].InspectionControlArray[j].InspectionInputTypeArray;
                            }
                        }
                    }
                }
                else if (levelId == "InspectionControlLevel3") {
                    isObjectEmpty = $.isEmptyObject(multiLevelObject3);
                    if (!isObjectEmpty) {
                        objectArray = multiLevelObject3.Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].InspectionControlArray[j].InspectionInputTypeArray;
                    }
                    else {
                        var IsLevel2ObjectEmpty = $.isEmptyObject(multiLevelObject2);
                        if (!IsLevel2ObjectEmpty) {
                            objectArray = multiLevelObject2.Answers[Level2AnswerIndex].MultiLevelArray[Level3QuestionIndex].Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].InspectionControlArray[j].InspectionInputTypeArray;
                        }
                        else {
                            var IsLevel1ObjectEmpty = $.isEmptyObject(multiLevelObject1);
                            if (!IsLevel1ObjectEmpty) {
                                objectArray = multiLevelObject1.Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[Level2AnswerIndex].MultiLevelArray[Level3QuestionIndex].Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].InspectionControlArray[j].InspectionInputTypeArray;
                            }
                            else {
                                if (sectionIndex < 0 || sectionIndex == undefined) {
                                    objectArray = parentMultiLevelArray[parentIndex].Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[Level2AnswerIndex].MultiLevelArray[Level3QuestionIndex].Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].InspectionControlArray[j].InspectionInputTypeArray;
                                }
                                else {
                                    objectArray = SectionDataArray[sectionIndex].MultiLevelTypeArray[parentIndex].Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[Level2AnswerIndex].MultiLevelArray[Level3QuestionIndex].Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].InspectionControlArray[j].InspectionInputTypeArray;
                                }
                            }
                        }
                    }
                }

                var fieldIndex = objectArray.findIndex(m => m.Id == SortedOrder[i]);
                if (fieldIndex > -1) {
                    objectArray[fieldIndex].FieldSequence = counter;
                    counter = counter + 1;
                }
            }
        }
    }

    else {
        for (var i = 0; i < PSortedOrder.length; i++) {
            var PIndex = PInspectionInputTypeArray.findIndex(m => m.Id == PSortedOrder[i]);
            if (PIndex > -1) {
                PInspectionInputTypeArray[PIndex].FieldSequence = i + 1;
            }
        }

        for (var i = 0; i < FSortedOrder.length; i++) {
            var FIndex = FInspectionInputTypeArray.findIndex(m => m.Id == FSortedOrder[i]);
            if (FIndex > -1) {
                FInspectionInputTypeArray[FIndex].FieldSequence = i + 1;
            }
        }
    }
}

$(document).ready(function () {
    $("#ddlmultilevelInspectionCodeStandards").multiselect();

    $("#btnMultilevelAnswer1").click(function () {
        debugger;
        $("#lblMultilevelOptions").text($(this).attr('name'));
        $("#txtNoofMultilevelOption,#txtMultilevelOptionDescription").val("");
        $("#spanChildNodeNumberError,#spanChildNodeNamesError").css("display", "none");

        var questionLevel1 = $("#txtMultilevelQuestion1").val();
        var Id = questionLevel1.replace(/\s/g, "_") + "_" + FieldCounter;
        multiLevelObject1 = {
            Id: Id,
            Question: questionLevel1,
            AnswerString: "",
            Answers: [],
            FieldSequence: FieldCounter,
            IsFieldPrivate: null,
            Level: 1,
            Index: -1
        }

        FieldCounter = FieldCounter + 1;
        mulitLevelIdCounter = mulitLevelIdCounter + 1;
    });

    $("#ddlMultilevelAnswer1").on("change", function () {
        debugger;
        $("#addmultileveltextbox1,#addmultileveldropdownlist1,#addmultilevelcheckbox1,#addmultilevelradiobutton1," +
            "#addmultilevelinspectioncontrol1,#addmultilevel1").removeClass("pointernone");
        selectedAnswerId1 = $("#ddlMultilevelAnswer1").val();
        var Level1contentId = "#Content_" + selectedAnswerId1;
        var Level2contentId = "#Content_" + selectedAnswerId2;
        var Level3contentId = "#Content_" + selectedAnswerId3;
        $('.multilevel_fields_container_1').find('.answerContent').css("display", "none");
        $('.multilevel_fields_container_1').find('' + Level1contentId + ','+ Level2contentId + ',' + Level3contentId).css("display", "block");

    });

    $("#SaveMultilevel1").click(function (e) {
        debugger;
        $(".multilevel_fields_container_1 .multilevel_edit_field,.multilevel_fields_container_1 .multilevel_edit_inspection_field," +
            ".multilevel_fields_container_1 .multilevel_remove_field,.multilevel_fields_container_1 .multilevel_remove_inspection_field," +
            ".multilevel_fields_container_1 .edit_multilevel_field_2,.multilevel_fields_container_1 .remove_multilevel_field_2").css("display", "none");

        $('.multilevel_fields_container_1').find('.field_pointeraction').addClass('field_pointer');
        $('.multilevel_fields_container_1').find('.inspection_pointeraction').addClass('inspection_pointer');

        SortingLevel1();

        var htmlpart = $(".multilevel_fields_container_1").html();
        var answersOption = [];
        var Id = "";
        var Question = $("#txtMultilevelQuestion1").val();
        var answersOptiontext = "";
        var isObjectEmpty = $.isEmptyObject(multiLevelObject1);
        if (!isObjectEmpty) {
            $.each(multiLevelObject1.Answers, function (index) {
                answersOption.push(multiLevelObject1.Answers[index].FieldCaption);
            });
            Id = multiLevelObject1.Id;
            multiLevelObject1.Question = Question;
            answersOptiontext = answersOption.join(',');
            parentMultiLevelArray.push(multiLevelObject1);
        }
        else {
            var parentId = $("#hdnParentMultilevelId1").val();
            parentIndex = parentMultiLevelArray.findIndex(m => m.Id == parentId);
            if (parentIndex > -1) {
                $.each(parentMultiLevelArray[parentIndex].Answers, function (index) {
                    answersOption.push(parentMultiLevelArray[parentIndex].Answers[index].FieldCaption);
                });
                Id = parentMultiLevelArray[parentIndex].Id;
                parentMultiLevelArray[parentIndex].Question = Question;
                answersOptiontext = answersOption.join(',');
            }
            else {
                var sectionId = $("#OldSectionId").val();
                sectionIndex = SectionDataArray.findIndex(m => m.Id == sectionId);
                if (sectionIndex > -1) {
                    var parentId = $("#hdnParentMultilevelId1").val();
                    parentIndex = SectionDataArray[sectionIndex].MultiLevelTypeArray.findIndex(m => m.Id == parentId);
                    if (parentIndex > -1) {
                        $.each(SectionDataArray[sectionIndex].MultiLevelTypeArray[parentIndex].Answers, function (index) {
                            answersOption.push(SectionDataArray[sectionIndex].MultiLevelTypeArray[parentIndex].Answers[index].FieldCaption);
                        });
                        Id = SectionDataArray[sectionIndex].MultiLevelTypeArray[parentIndex].Id;
                        SectionDataArray[sectionIndex].MultiLevelTypeArray[parentIndex].Question = Question;
                        answersOptiontext = answersOption.join(',');
                    }
                }
            }
        }

        if (!isObjectEmpty) {
            $('.input_fields_container').append("<div id='" + Id + "' style='border:1px solid #ddd; margin-bottom:10px; margin-top:10px;'><div class='col-md-12' style='background:#aaa;padding-top:6px;margin-bottom:8px;'><label>Multilevel Question :</label><label id='lblmultilevelcontrolname'>" + Question + "</label>" +
                "<a href='#' class='edit_multilevel_field_1' style='margin-left:10px;'>Edit</a>" +
                "<a href='#' class='remove_multilevel_field_1' style='margin-left:10px;'>Remove</a></div><div class='col-md-12'>" +
                "<label>Options :  </label><label id='lblAnswerOptions'>" + answersOptiontext + "</label><br/>" +
                "<div class='final_multilevel_container_1'>" + htmlpart + "</div></div></div>");
            multiLevelObject1 = {};
            FieldCounter = FieldCounter + 1;
        }
        else {
            $('.input_fields_container div[Id=' + Id + ']').html("<div class='col-md-12' style='background:#aaa;padding-top:6px;margin-bottom:8px;'><label>Multilevel Question :</label><label id='lblmultilevelcontrolname'>" + Question + "</label>" +
                "<a href='#' class='edit_multilevel_field_1' style='margin-left:10px;'>Edit</a>" +
                "<a href='#' class='remove_multilevel_field_1' style='margin-left:10px;'>Remove</a></div><div class='col-md-12'>" +
                "<label>Options :  </label><label id='lblAnswerOptions'>" + answersOptiontext + "</label><br/>" +
                "<div class='final_multilevel_container_1'>" + htmlpart + "</div></div>")
        }

    });

    $("#addmultileveltextbox1").click(function (e) {
        debugger;
        e.preventDefault();

        if (TextBoxCaptionInput()) {

            var Id = TextboxCaption.replace(/\s|,/g, "_") + "_" + FieldCounter;
            var contentId = "#Content_" + selectedAnswerId1;
            var textboxType = $(this).attr('name');
            var labelClassName = "field_pointeraction";
            renderingDiv = '.multilevel_fields_container_1 ' + contentId;
            fromInspection = false;

            GetSetJsonMultilevelInputType1('TextBox', TextboxCaption, FieldCounter, Id, selectedAnswerId1, fromInspection);
            FieldCounter = FieldCounter + 1;

            $(renderingDiv).append('<div class="col-sm-3" id="' + Id + '" style="display:inline-block"><div class="form-group"><label id="lbltextbox">' + TextboxCaption + '</label >' +
                '<input class="form-control"  type="text"/>' +
                '<label class="' + labelClassName + '"><input checked class= "multilevel_private_field" type = "checkbox" name="Private Field"> Private Field</label>' +
                '<a href="#" class="multilevel_edit_field" style = "margin-left:10px;"> Edit</a>' +
                '<a href="#" class="multilevel_remove_field" style="margin-left:10px;">Remove</a></div></div>');
        }
    });

    $("#addmultileveldropdownlist1,#addmultilevelcheckbox1,#addmultilevelradiobutton1").click(function (e) {
        e.preventDefault();
        debugger;
        var controlName = $(this).attr('name');
        if (controlName.indexOf('_') > -1) {
            var controlarray = controlName.split('_');
            controlName = controlarray[1];
            $("#lblHiddenMultilevelInspectionControl1").text(controlarray[0]);
        }
        $("#lblMultilevelControlCaptionId1").text(controlName);
        $("#txtMultilevelControlCaptionId1,#txtMultilevelControlCaptionOption1").val("");
        $("#lblHiddenMultilevelInspectionControl1").text("");
        $("#IsFieldForEdit1").val(false);
        $("#spanControlCaptionIdError1, #spanCaptionOptionError1").css("display", "none");
    });

    $("#AddMultilevelControlOptions1").click(function () {
        debugger;
        $("#spanControlCaptionIdError1, #spanCaptionOptionError1").css("display", "none");
        var controlType = $("#lblMultilevelControlCaptionId1").text();
        var controlCaption = $("#txtMultilevelControlCaptionId1").val();
        var controlOption = $("#txtMultilevelControlCaptionOption1").val();
        controlOption = controlOption.replace(/\n/g, '').trim();

        if ((controlCaption == "" || controlCaption == undefined) && (controlOption == "" || controlOption == undefined)) {
            $("#spanControlCaptionIdError1, #spanCaptionOptionError1").css("display", "block");
            return false;
        }
        else if (controlCaption == "" || controlCaption == undefined) {
            $("#spanControlCaptionIdError1").css("display", "block");
            return false;
        }
        else if (controlOption == "" || controlOption == undefined) {
            $("#spanCaptionOptionError1").css("display", "block");
            return false;
        }

        if (!VerifyUserInput(controlCaption)) {
            return false;
        }
        if (!VerifyUserInput(controlOption)) {
            return false;
        }

        var InspectionControlName = $("#lblHiddenMultilevelInspectionControl1").text();
        var controlOptionArray = controlOption.split(',');
        var contentId = "#Content_" + selectedAnswerId1;

        var IsFieldforEdit = $("#IsFieldForEdit1").val();

        var labelClassName = "field_pointeraction";
        var checkedAttribute = "";
        var IsFieldPrivate = true;

        var currentSelectedVal = null;
        if (InspectionControlName == "InspectionControl") {
            currentSelectedVal = $("#ddlmultilevelInspectionStatus").val();
            var dvToRender = GetDivId(currentSelectedVal);
            renderingDiv = ".Multilevel_Inspection_Control_container #" + dvToRender;
            fromInspection = true;
            labelClassName = "inspection_pointeraction";
        }
        else {
            renderingDiv = '.multilevel_fields_container_1 ' + contentId;
            fromInspection = false;
        }

        var Id = controlCaption.replace(/\s/g, "_") + "_" + FieldCounter;
        if (IsFieldforEdit == "true") {
            var oldControlId = $("#OldMultilevelControlId1").val();
            var isObjectEmpty = $.isEmptyObject(multiLevelObject1);

            if (InspectionControlName == "InspectionControl") {
                //it checks for private and edit the field too
               IsFieldPrivate =  EditInspectionControlFields1(isObjectEmpty, oldControlId, currentSelectedVal, controlCaption, controlOption);
            }
            else {
                var listofindexes = GetIndexes1(isObjectEmpty, oldControlId);
                index = listofindexes.index; controlIndex = listofindexes.controlIndex; parentIndex = listofindexes.parentIndex;
                sectionIndex = listofindexes.sectionIndex;

                if (!isObjectEmpty) {
                    multiLevelObject1.Answers[index].MultiLevelInputTypeArray[controlIndex].Type = controlType;
                    multiLevelObject1.Answers[index].MultiLevelInputTypeArray[controlIndex].Caption = controlCaption;
                    multiLevelObject1.Answers[index].MultiLevelInputTypeArray[controlIndex].Option = controlOption;
                    IsFieldPrivate = multiLevelObject1.Answers[index].MultiLevelInputTypeArray[controlIndex].IsFieldPrivate;
                }
                else {
                    if (sectionIndex < 0 || sectionIndex == undefined) {
                        parentMultiLevelArray[parentIndex].Answers[index].MultiLevelInputTypeArray[controlIndex].Type = controlType;
                        parentMultiLevelArray[parentIndex].Answers[index].MultiLevelInputTypeArray[controlIndex].Caption = controlCaption;
                        parentMultiLevelArray[parentIndex].Answers[index].MultiLevelInputTypeArray[controlIndex].Option = controlOption;
                        IsFieldPrivate = parentMultiLevelArray[parentIndex].Answers[index].MultiLevelInputTypeArray[controlIndex].IsFieldPrivate;
                    }
                    else {
                        SectionDataArray[sectionIndex].MultiLevelTypeArray[parentIndex].Answers[index].MultiLevelInputTypeArray[controlIndex].Type = controlType;
                        SectionDataArray[sectionIndex].MultiLevelTypeArray[parentIndex].Answers[index].MultiLevelInputTypeArray[controlIndex].Caption = controlCaption;
                        SectionDataArray[sectionIndex].MultiLevelTypeArray[parentIndex].Answers[index].MultiLevelInputTypeArray[controlIndex].Option = controlOption;
                        IsFieldPrivate = SectionDataArray[sectionIndex].MultiLevelTypeArray[parentIndex].Answers[index].MultiLevelInputTypeArray[controlIndex].IsFieldPrivate;
                    }
                }
            }

            if (IsFieldPrivate) checkedAttribute = "checked";
            var labelname = "";
            switch (controlType) {
                case 'DropDownList': labelname = "#lbldropdownlist"; break;
                case 'CheckBox': labelname = "#lblcheckbox"; break;
                case 'Radio': labelname = "#lblradio"; break;
                default: break;
            }

            $(renderingDiv + " div[id='" + oldControlId + "']").find('' + labelname + '').text(controlCaption);
            $.ajax({
                type: 'Get',
                url: '/form/GenerateHtml',
                data: { 'caption': controlCaption, 'options': controlOption, 'inputType': controlType, 'isEditingControl': true },
                success: function (data) {
                    $(renderingDiv + " div[id='" + oldControlId + "']").children().html(data +
                        '<label class="' + labelClassName + '"><input '+ checkedAttribute +' class="multilevel_private_field" type="checkbox" name="Private Field">Private Field</label>' +
                        '<a href="#" class="multilevel_edit_field" style="margin-left: 10px;")>Edit</a>' +
                        '<a href="#" class="multilevel_remove_field" style="margin-left: 10px;")>Remove</a></div>');
                }
            });
            $("#IsFieldForEdit1").val(false);
        }

        else {
            if (controlType == "DropDownList") {
                var container = ('<div class="col-sm-3" id="' + Id + '" style = "display:inline-block"><div class="form-group"><label id="lbldropdownlist">' + controlCaption + '</label>' +
                    '<select class="from-control" style="width:100%">');
                for (var i = 0; i < controlOptionArray.length; i++) {
                    container = container + ("<option>" + controlOptionArray[i] + "</option>");
                }
                container = container + ('</select><label class="' + labelClassName + '"><input checked class= "multilevel_private_field" type = "checkbox" name="Private Field"> Private Field</label>' +
                    '<a href = "#" class= "multilevel_edit_field" style = "margin-left:10px;"> Edit</a>' +
                    '<a href = "#" class= "multilevel_remove_field" style = "margin-left:10px;" > Remove</a></div></div>');
            }

            else if (controlType == "CheckBox") {
                var container = ('<div class="col-sm-3" id="' + Id + '"  style="display:inline-block"><div class="form-group"><label id="lblcheckbox">' + controlCaption + '</label><br>');
                for (var i = 0; i < controlOptionArray.length; i++) {
                    container = container + ('<label class="checkbox-inline"><input type="checkbox"/>' + controlOptionArray[i] + '</label>');
                }
                container = container + ('<br><label class="' + labelClassName + '"><input checked class= "multilevel_private_field" type = "checkbox" name="Private Field"> Private Field</label>' +
                    '<a href = "#" class= "multilevel_edit_field" style = "margin-left:10px;"> Edit</a>' +
                    '<a href = "#" class= "multilevel_remove_field" style = "margin-left:10px;" > Remove</a ></div></div>');
            }

            else if (controlType == "Radio") {
                var container = ('<div class="col-sm-3" id="' + Id + '"  style="display:inline-block"><div class="form-group"><label id="lblradio">' + controlCaption + '</label><br>');
                for (var i = 0; i < controlOptionArray.length; i++) {
                    container = container + ('<label class="radio-inline"><input type="radio"/>' + controlOptionArray[i] + '</label>');
                }
                container = container + ('<br><label class="' + labelClassName + '"><input checked class= "multilevel_private_field" type = "checkbox" name="Private Field"> Private Field</label>' +
                    '<a href = "#" class= "multilevel_edit_field" style = "margin-left:10px;"> Edit</a>' +
                    '<a href = "#" class= "multilevel_remove_field" style = "margin-left:10px;">Remove</a></div></div> ');
            }

            GetSetJsonMultilevelInputType1(controlType, controlCaption, FieldCounter, Id, selectedAnswerId1, fromInspection, currentSelectedVal, controlOption);
            FieldCounter = FieldCounter + 1;
            $(renderingDiv).append(container);
        }


    });

    //InspectionControl
    $("#addmultilevelinspectiontextbox").click(function (e) {
        debugger;
        e.preventDefault();

        if (TextBoxCaptionInput()) {

            var Id = TextboxCaption.replace(/\s|,/g, "_") + "_" + FieldCounter;
            var contentId = "";
            var labelClassName = "inspection_pointeraction";
            var levelId = $("#hdnInspectionControlLevelId").val();
            if (levelId == "InspectionControlLevel1") {
                contentId = "#Content_" + selectedAnswerId1;
            }
            var currentSelectedVal = $("#ddlmultilevelInspectionStatus").val();
            var dvToRender = GetDivId(currentSelectedVal);
            renderingDiv = ".Multilevel_Inspection_Control_container #" + dvToRender;
            fromInspection = true;
            var levelId = $("#hdnInspectionControlLevelId").val();

            if (levelId == "InspectionControlLevel1") {
                GetSetJsonMultilevelInputType1('TextBox', TextboxCaption, FieldCounter, Id, selectedAnswerId1, fromInspection, currentSelectedVal);
            }
            else if(levelId == "InspectionControlLevel2"){
                GetSetJsonMultilevelInputType2('TextBox', TextboxCaption, FieldCounter, Id, selectedAnswerId1, fromInspection, currentSelectedVal);
            }
            else if (levelId == "InspectionControlLevel3") {
                GetSetJsonMultilevelInputType3('TextBox', TextboxCaption, FieldCounter, Id, selectedAnswerId1, fromInspection, currentSelectedVal);
            }
            
            FieldCounter = FieldCounter + 1;

            $(renderingDiv).append('<div class="col-sm-3" id="' + Id + '" style="display:inline-block"><div class="form-group"><label id="lbltextbox">' + TextboxCaption + '</label >' +
                '<input class="form-control"  type="text"/>' +
                '<label class="' + labelClassName + '"><input checked class= "multilevel_private_field" type = "checkbox" name="Private Field"> Private Field</label>' +
                '<a href="#" class="multilevel_edit_field" style = "margin-left:10px;"> Edit</a>' +
                '<a href="#" class="multilevel_remove_field" style="margin-left:10px;">Remove</a></div></div>');
        }
    });

    $("#addmultilevelinspectiondropdownlist,#addmultilevelinspectioncheckbox,#addmultilevelinspectionradiobutton").click(function (e) {
        e.preventDefault();
        debugger;
        var controlName = $(this).attr('name');
        if (controlName.indexOf('_') > -1) {
            var controlarray = controlName.split('_');
            controlName = controlarray[1];
        }

        var levelId = $("#hdnInspectionControlLevelId").val();
        if (levelId == "InspectionControlLevel1") {
            $("#lblHiddenMultilevelInspectionControl1").text(controlarray[0]);
            $("#lblMultilevelControlCaptionId1").text(controlName);
            $("#txtMultilevelControlCaptionId1,#txtMultilevelControlCaptionOption1").val("");
            $("#IsFieldForEdit1").val("");
            $("#addMultilevelControlOption1").modal('show');
        }
        else if (levelId == "InspectionControlLevel2") {
            $("#lblHiddenMultilevelInspectionControl2").text(controlarray[0]);
            $("#lblMultilevelControlCaptionId2").text(controlName);
            $("#txtMultilevelControlCaptionId2,#txtMultilevelControlCaptionOption2").val("");
            $("#IsFieldForEdit2").val("");
            $("#addMultilevelControlOption2").modal('show');
        }
        else if (levelId == "InspectionControlLevel3") {
            $("#lblHiddenMultilevelInspectionControl3").text(controlarray[0]);
            $("#lblMultilevelControlCaptionId3").text(controlName);
            $("#txtMultilevelControlCaptionId3,#txtMultilevelControlCaptionOption3").val("");
            $("#IsFieldForEdit3").val("");
            $("#addMultilevelControlOption3").modal('show');
        }
    });

    $("#addmultilevelinspectioncontrol1,#addmultilevelinspectioncontrol2, #addmultilevelinspectioncontrol3").click(function (e) {

        $("#addmultilevelinspectiontextbox, #addmultilevelinspectiondropdownlist," +
            "#addmultilevelinspectioncheckbox, #addmultilevelinspectionradiobutton").addClass("pointernone");

        $(".Multilevel_Inspection_Control_container #dvP, .Multilevel_Inspection_Control_container #dvF").empty().sortable();
        $("#ddlmultilevelInspectionStatus").val("Select");
        $("#MultilevelInspectionControlId").val("");
        PInspectionInputTypeArray = [];
        FInspectionInputTypeArray = [];
        $("#ddlmultilevelInspectionCodeStandards").multiselect('deselectAll', false).multiselect('updateButtonText');
        $('.Multilevel_Inspection_Control_container #dvPparent,.Multilevel_Inspection_Control_container #dvFparent').removeClass("active").addClass("inspectioncontent");
        $("#chkMultilevelIsMetaInfo").prop("checked", false);

        $('.Multilevel_Inspection_Control_container #lblPAllPrivateField,.Multilevel_Inspection_Control_container #lblFAllPrivateField').css("display", "inline");
        $('.Multilevel_Inspection_Control_container #chkPAllMultilevelPrivateField,.Multilevel_Inspection_Control_container #chkFAllMultilevelPrivateField').prop("checked", false);

        $("#hdnInspectionControlLevelId").val($(this).attr('name'));

        
    });

    $("#ddlmultilevelInspectionStatus").on("change", function (e) {
        e.preventDefault();
        selectedvalue = $(this).val();
        if (selectedvalue == "P") {
            $('.Multilevel_Inspection_Control_container  #dvPparent').addClass("active");
            $('.Multilevel_Inspection_Control_container  #dvFparent').removeClass("active");
        }
        else if (selectedvalue == "F") {
            $('.Multilevel_Inspection_Control_container  #dvFparent').addClass("active");
            $('.Multilevel_Inspection_Control_container  #dvPparent').removeClass("active");
        }
        $("#spanInspectionControlStatusError").css("display", "none");
        $("#addmultilevelinspectiontextbox, #addmultilevelinspectiondropdownlist," +
            "#addmultilevelinspectioncheckbox, #addmultilevelinspectionradiobutton").removeClass("pointernone");
    });
    
    $(".Multilevel_Inspection_Control_container").on("change", "#chkPAllMultilevelPrivateField,#chkFAllMultilevelPrivateField", function (e) {
        debugger;
        var CurrentSelectedStatus = $("#ddlmultilevelInspectionStatus").val();

        var listofIndexes = GetMultilevelInspectionIndex(CurrentSelectedStatus);

        Level2AnswerIndex = listofIndexes.Level2AnswerIndex; Level3QuestionIndex = listofIndexes.Level3QuestionIndex;
        Level1AnswerIndex = listofIndexes.Level1AnswerIndex; Level2QuestionIndex = listofIndexes.Level2QuestionIndex;
        InspectionIndex = listofIndexes.InspectionIndex; index = listofIndexes.index; controlIndex = listofIndexes.controlIndex;
        currentSelectedStatusIndex = listofIndexes.currentSelectedStatusIndex; parentIndex = listofIndexes.parentIndex;
        sectionIndex = listofIndexes.sectionIndex;


        var isChecked = $(this).prop("checked");
        if (isChecked) {
            $(".Multilevel_Inspection_Control_container .multilevel_private_field").attr("checked", "checked").prop("checked", isChecked);
            $(this).attr("checked", "checked");
        }
        else {
            $(".Multilevel_Inspection_Control_container .multilevel_private_field").removeAttr("checked", "checked").prop("checked", isChecked);
            $(this).removeAttr("checked", "checked");
        }

        if (InspectionIndex > -1) {
            switch (CurrentSelectedStatus) {
                case 'P':
                    $.each(PInspectionInputTypeArray, function (index) {
                        debugger;
                        PInspectionInputTypeArray[index].IsFieldPrivate = isChecked;
                    });
                    break;
                case 'F':
                    $.each(FInspectionInputTypeArray, function (index) {
                        FInspectionInputTypeArray[index].IsFieldPrivate = isChecked;
                    });
                    break;
                default: break;
            }
        }
        else {
            var levelId = $("#hdnInspectionControlLevelId").val();
            if (levelId == "InspectionControlLevel1") {
                isObjectEmpty = $.isEmptyObject(multiLevelObject1);
                if (!isObjectEmpty) {
                    $.each(multiLevelObject1.Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].InspectionControlArray[currentSelectedStatusIndex].InspectionInputTypeArray, function (fieldIndex) {
                        multiLevelObject1.Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].InspectionControlArray[currentSelectedStatusIndex].InspectionInputTypeArray[fieldIndex].IsFieldPrivate = isChecked;
                    });
                }
                else {
                    if (sectionIndex < 0 || sectionIndex == undefined) {
                        $.each(parentMultiLevelArray[parentIndex].Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].InspectionControlArray[currentSelectedStatusIndex].InspectionInputTypeArray, function (fieldIndex) {
                            parentMultiLevelArray[parentIndex].Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].InspectionControlArray[currentSelectedStatusIndex].InspectionInputTypeArray[fieldIndex].IsFieldPrivate = isChecked;
                        });
                    }
                    else {
                        $.each(SectionDataArray[sectionIndex].MultiLevelTypeArray[parentIndex].Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].InspectionControlArray[currentSelectedStatusIndex].InspectionInputTypeArray, function (fieldIndex) {
                            SectionDataArray[sectionIndex].MultiLevelTypeArray[parentIndex].Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].InspectionControlArray[currentSelectedStatusIndex].InspectionInputTypeArray[fieldIndex].IsFieldPrivate = isChecked;
                        });
                    }
                }
            }
            else if (levelId == "InspectionControlLevel2") {
                isObjectEmpty = $.isEmptyObject(multiLevelObject2);
                if (!isObjectEmpty) {
                    $.each(multiLevelObject2.Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].InspectionControlArray[currentSelectedStatusIndex].InspectionInputTypeArray, function (fieldIndex) {
                        multiLevelObject2.Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].InspectionControlArray[currentSelectedStatusIndex].InspectionInputTypeArray[fieldIndex].IsFieldPrivate = isChecked;
                    });
                }
                else {
                    if (parentIndex < 0 || parentIndex == undefined) {
                        $.each(multiLevelObject1.Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].InspectionControlArray[currentSelectedStatusIndex].InspectionInputTypeArray, function (fieldIndex) {
                            multiLevelObject1.Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].InspectionControlArray[currentSelectedStatusIndex].InspectionInputTypeArray[fieldIndex].IsFieldPrivate = isChecked;
                        });
                    }
                    else {
                        if (sectionIndex < 0 || sectionIndex == undefined) {
                            $.each(parentMultiLevelArray[parentIndex].Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].InspectionControlArray[currentSelectedStatusIndex].InspectionInputTypeArray, function (fieldIndex) {
                                parentMultiLevelArray[parentIndex].Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].InspectionControlArray[currentSelectedStatusIndex].InspectionInputTypeArray[fieldIndex].IsFieldPrivate = isChecked;
                            });
                        }
                        else {
                            $.each(SectionDataArray[sectionIndex].MultiLevelTypeArray[parentIndex].Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].InspectionControlArray[currentSelectedStatusIndex].InspectionInputTypeArray, function (fieldIndex) {
                                SectionDataArray[sectionIndex].MultiLevelTypeArray[parentIndex].Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].InspectionControlArray[currentSelectedStatusIndex].InspectionInputTypeArray[fieldIndex].IsFieldPrivate = isChecked;
                            });
                        }
                    }
                }
            }
            else if (levelId == "InspectionControlLevel3") {
                isObjectEmpty = $.isEmptyObject(multiLevelObject3);
                if (!isObjectEmpty) {
                    $.each(multiLevelObject3.Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].InspectionControlArray[currentSelectedStatusIndex].InspectionInputTypeArray, function (fieldIndex) {
                        multiLevelObject3.Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].InspectionControlArray[currentSelectedStatusIndex].InspectionInputTypeArray[fieldIndex].IsFieldPrivate = isChecked;
                    });
                }
                else {
                    if (Level2QuestionIndex < 0 || Level2QuestionIndex == undefined) {
                        $.each(multiLevelObject2.Answers[Level2AnswerIndex].MultiLevelArray[Level3QuestionIndex].Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].InspectionControlArray[currentSelectedStatusIndex].InspectionInputTypeArray, function (fieldIndex) {
                            multiLevelObject2.Answers[Level2AnswerIndex].MultiLevelArray[Level3QuestionIndex].Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].InspectionControlArray[currentSelectedStatusIndex].InspectionInputTypeArray[fieldIndex].IsFieldPrivate = isChecked;
                        });
                    }
                    else {
                        if (parentIndex < 0 || parentIndex == undefined) {
                            $.each(multiLevelObject1.Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[Level2AnswerIndex].MultiLevelArray[Level3QuestionIndex].Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].InspectionControlArray[currentSelectedStatusIndex].InspectionInputTypeArray, function (fieldIndex) {
                                multiLevelObject1.Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[Level2AnswerIndex].MultiLevelArray[Level3QuestionIndex].Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].InspectionControlArray[currentSelectedStatusIndex].InspectionInputTypeArray[fieldIndex].IsFieldPrivate = isChecked;
                            });
                        }
                        else {
                            if (sectionIndex < 0 || sectionIndex == undefined) {
                                $.each(parentMultiLevelArray[parentIndex].Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[Level2AnswerIndex].MultiLevelArray[Level3QuestionIndex].Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].InspectionControlArray[currentSelectedStatusIndex].InspectionInputTypeArray, function (fieldIndex) {
                                    parentMultiLevelArray[parentIndex].Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[Level2AnswerIndex].MultiLevelArray[Level3QuestionIndex].Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].InspectionControlArray[currentSelectedStatusIndex].InspectionInputTypeArray[fieldIndex].IsFieldPrivate = isChecked;
                                });
                            }
                            else {
                                $.each(SectionDataArray[sectionIndex].MultiLevelTypeArray[parentIndex].Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[Level2AnswerIndex].MultiLevelArray[Level3QuestionIndex].Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].InspectionControlArray[currentSelectedStatusIndex].InspectionInputTypeArray, function (fieldIndex) {
                                    SectionDataArray[sectionIndex].MultiLevelTypeArray[parentIndex].Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[Level2AnswerIndex].MultiLevelArray[Level3QuestionIndex].Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].InspectionControlArray[currentSelectedStatusIndex].InspectionInputTypeArray[fieldIndex].IsFieldPrivate = isChecked;
                                });
                            }
                        }
                    }
                }
            }
        }
    });

    $("#AddMultilevelInspectionControl").click(function (e) {
        debugger;

        var inspectionName = $('#MultilevelInspectionControlId').val();
        var inspectionStatus = $('#ddlmultilevelInspectionStatus').val();
        var codestandard = $("#ddlmultilevelInspectionCodeStandards").val();
        var isCheckedAllP = $("#chkPAllMultilevelPrivateField").prop("checked");
        var isCheckedAllF = $("#chkFAllMultilevelPrivateField").prop("checked");
        var isMetaInfo = $("#chkMultilevelIsMetaInfo").prop("checked");
        var isMetaInfoText = "No";
        if (isMetaInfo)
            isMetaInfoText = "Yes";

        var IsInspectionControlForEdit = $("#IsMultilevelInspectionControlForEdit").val();
        if (!VerifyUserInput(inspectionName)) {
            return false;
        }

        var codestandardtext = $.map($("#ddlmultilevelInspectionCodeStandards option:selected"), function (e, i) {
            return $(e).text()
        });
        if (codestandardtext == "") {
            codestandardtext = "None"
        }
        else {
            codestandardtext = codestandardtext.join(", ");
        }

        if (codestandard != null) {
            codestandard = codestandard.toString();
        }

        $('.Multilevel_Inspection_Control_container .multilevel_edit_field,.Multilevel_Inspection_Control_container .multilevel_remove_field,' +
            '#lblPAllPrivateField, #lblFAllPrivateField').css("display", "none");

        $(".Inspection_Control_container .remove_field").css("display", "none");

        if ($(".Multilevel_Inspection_Control_container #dvP").html().trim() != "") {
            $('.Multilevel_Inspection_Control_container #dvPparent').removeClass().addClass("row");
        }
        else {
            $('.Multilevel_Inspection_Control_container #dvPparent').removeClass("active");
        }

        if ($(".Multilevel_Inspection_Control_container #dvF").html().trim() != "") {
            $('.Multilevel_Inspection_Control_container #dvFparent').removeClass().addClass("row");
        }
        else {
            $('.Multilevel_Inspection_Control_container #dvFparent').removeClass("active");
        }
        $('.Multilevel_Inspection_Control_container').find('.inspection_pointeraction').addClass('inspection_pointer');

        var htmlpart = $('.Multilevel_Inspection_Control_container').html();
        var Inspectionhtmlpart = $('#dvInspectionControlRadio').html();
        var levelId = $("#hdnInspectionControlLevelId").val();
        var isObjectEmpty = false;
        if (IsInspectionControlForEdit == "true") {
            if (levelId == "InspectionControlLevel1") {
                isObjectEmpty = $.isEmptyObject(multiLevelObject1);
                if (!isObjectEmpty) {
                    index = multiLevelObject1.Answers.findIndex(m => m.Id == selectedAnswerId1);
                    if (index > -1) {
                        var InspectionIndex = multiLevelObject1.Answers[index].MultiLevelInspectionInputTypeArray.findIndex(m => m.Id == InspectionControlId);
                        if (InspectionIndex > -1) {
                            multiLevelObject1.Answers[index].MultiLevelInspectionInputTypeArray[InspectionIndex].Name = inspectionName;
                            multiLevelObject1.Answers[index].MultiLevelInspectionInputTypeArray[InspectionIndex].CodeStandard = codestandard;
                            multiLevelObject1.Answers[index].MultiLevelInspectionInputTypeArray[InspectionIndex].IsMetaInfoRequired = isMetaInfo;
                        }

                        if (PInspectionInputTypeArray.length > 0) {
                            $.each(PInspectionInputTypeArray, function (index) {
                                multiLevelObject1.Answers[index].MultiLevelInspectionInputTypeArray[InspectionIndex].InspectionControlArray[0].InspectionInputTypeArray.push(PInspectionInputTypeArray[index]);
                            });
                        }

                        if (FInspectionInputTypeArray.length > 0) {
                            $.each(FInspectionInputTypeArray, function (index) {
                                debugger;
                                multiLevelObject1.Answers[index].MultiLevelInspectionInputTypeArray[InspectionIndex].InspectionControlArray[1].InspectionInputTypeArray.push(FInspectionInputTypeArray[index]);
                            });
                        }
                    }
                }
                else {
                    var parentId = $("#hdnParentMultilevelId1").val();
                    parentIndex = parentMultiLevelArray.findIndex(m => m.Id == parentId);
                    if (parentIndex > -1) {
                        //Level1AnswerIndex = $("#hdnLevel1AnswerIndex").val();
                        //Level2QuestionIndex = $("#hdnLevel2QuestionIndex").val();
                        //index = parentMultiLevelArray[parentIndex].Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers.findIndex(m => m.Id == selectedAnswerId1);
                        index = parentMultiLevelArray[parentIndex].Answers.findIndex(m => m.Id == selectedAnswerId1);
                        if (index > -1) {
                            controlIndex = parentMultiLevelArray[parentIndex].Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[index].MultiLevelInspectionInputTypeArray.findIndex(m => m.Id == InspectionControlId);
                            if (controlIndex > -1) {
                                parentMultiLevelArray[parentIndex].Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].Name = inspectionName;
                                parentMultiLevelArray[parentIndex].Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].CodeStandard = codestandard;
                                parentMultiLevelArray[parentIndex].Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].IsMetaInfoRequired = isMetaInfo;
                            }
                            if (PInspectionInputTypeArray.length > 0) {
                                $.each(PInspectionInputTypeArray, function (index) {
                                    parentMultiLevelArray[parentIndex].Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].InspectionControlArray[0].InspectionInputTypeArray.push(PInspectionInputTypeArray[index]);
                                });
                            }

                            if (FInspectionInputTypeArray.length > 0) {
                                $.each(FInspectionInputTypeArray, function (index) {
                                    debugger;
                                    parentMultiLevelArray[parentIndex].Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].InspectionControlArray[1].InspectionInputTypeArray.push(FInspectionInputTypeArray[index]);
                                });
                            }
                        }
                    }
                    else {
                        var sectionId = $("#OldSectionId").val();
                        sectionIndex = SectionDataArray.findIndex(m => m.Id == sectionId);
                        if (sectionIndex > -1) {
                            var parentId = $("#hdnParentMultilevelId1").val();
                            parentIndex = SectionDataArray[sectionIndex].MultiLevelTypeArray.findIndex(m => m.Id == parentId);
                            if (parentIndex > -1) {
                                index = SectionDataArray[sectionIndex].MultiLevelTypeArray[parentIndex].Answers.findIndex(m => m.Id == selectedAnswerId1);
                                if (index > -1) {
                                    controlIndex = SectionDataArray[sectionIndex].MultiLevelTypeArray[parentIndex].Answers[index].MultiLevelInspectionInputTypeArray.findIndex(m => m.Id == InspectionControlId);
                                    if (controlIndex > -1) {
                                        SectionDataArray[sectionIndex].MultiLevelTypeArray[parentIndex].Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].Name = inspectionName;
                                        SectionDataArray[sectionIndex].MultiLevelTypeArray[parentIndex].Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].CodeStandard = codestandard;
                                        SectionDataArray[sectionIndex].MultiLevelTypeArray[parentIndex].Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].IsMetaInfoRequired = isMetaInfo;
                                    }
                                    if (PInspectionInputTypeArray.length > 0) {
                                        $.each(PInspectionInputTypeArray, function (index) {
                                            SectionDataArray[sectionIndex].MultiLevelTypeArray[parentIndex].Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].InspectionControlArray[0].InspectionInputTypeArray.push(PInspectionInputTypeArray[index]);
                                        });
                                    }

                                    if (FInspectionInputTypeArray.length > 0) {
                                        $.each(FInspectionInputTypeArray, function (index) {
                                            debugger;
                                            SectionDataArray[sectionIndex].MultiLevelTypeArray[parentIndex].Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].InspectionControlArray[1].InspectionInputTypeArray.push(FInspectionInputTypeArray[index]);
                                        });
                                    }
                                }
                            }
                        }
                    }
                }

                renderingDiv = ".multilevel_fields_container_1 #" + InspectionControlId;
                $("#lblHiddenMultilevelInspectionControl1").text("");
            }
            else if (levelId == "InspectionControlLevel2") {
                isObjectEmpty = $.isEmptyObject(multiLevelObject2);
                if (!isObjectEmpty) {
                    index = multiLevelObject2.Answers.findIndex(m => m.Id == selectedAnswerId2);
                    if (index > -1) {
                        var InspectionIndex = multiLevelObject2.Answers[index].MultiLevelInspectionInputTypeArray.findIndex(m => m.Id == InspectionControlId);
                        if (InspectionIndex > -1) {
                            multiLevelObject2.Answers[index].MultiLevelInspectionInputTypeArray[InspectionIndex].Name = inspectionName;
                            multiLevelObject2.Answers[index].MultiLevelInspectionInputTypeArray[InspectionIndex].CodeStandard = codestandard;
                            multiLevelObject2.Answers[index].MultiLevelInspectionInputTypeArray[InspectionIndex].IsMetaInfoRequired = isMetaInfo;
                        }

                        if (PInspectionInputTypeArray.length > 0) {
                            $.each(PInspectionInputTypeArray, function (index) {
                                multiLevelObject2.Answers[index].MultiLevelInspectionInputTypeArray[InspectionIndex].InspectionControlArray[0].InspectionInputTypeArray.push(PInspectionInputTypeArray[index]);
                            });
                        }

                        if (FInspectionInputTypeArray.length > 0) {
                            $.each(FInspectionInputTypeArray, function (index) {
                                debugger;
                                multiLevelObject2.Answers[index].MultiLevelInspectionInputTypeArray[InspectionIndex].InspectionControlArray[1].InspectionInputTypeArray.push(FInspectionInputTypeArray[index]);
                            });
                        }
                    }
                }
                else {
                    var IsLevel1ObjectEmpty = $.isEmptyObject(multiLevelObject1);
                    if (!IsLevel1ObjectEmpty) {
                        Level1AnswerIndex = $("#hdnLevel1AnswerIndex").val();
                        Level2QuestionIndex = $("#hdnLevel2QuestionIndex").val();
                        index = multiLevelObject1.Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers.findIndex(m => m.Id == selectedAnswerId2);
                        if (index > -1) {
                            controlIndex = multiLevelObject1.Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[index].MultiLevelInspectionInputTypeArray.findIndex(m => m.Id == InspectionControlId);
                            if (controlIndex > -1) {
                                multiLevelObject1.Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].Name = inspectionName;
                                multiLevelObject1.Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].CodeStandard = codestandard;
                                multiLevelObject1.Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].IsMetaInfoRequired = isMetaInfo;

                                if (PInspectionInputTypeArray.length > 0) {
                                    $.each(PInspectionInputTypeArray, function (index) {
                                        multiLevelObject1.Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].InspectionControlArray[0].InspectionInputTypeArray.push(PInspectionInputTypeArray[index]);
                                    });
                                }

                                if (FInspectionInputTypeArray.length > 0) {
                                    $.each(FInspectionInputTypeArray, function (index) {
                                        debugger;
                                        multiLevelObject1.Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].InspectionControlArray[1].InspectionInputTypeArray.push(FInspectionInputTypeArray[index]);
                                    });
                                }
                            }
                        }
                    }
                    else {
                        var parentId = $("#hdnParentMultilevelId1").val();
                        parentIndex = parentMultiLevelArray.findIndex(m => m.Id == parentId);
                        if (parentIndex > -1) {
                            Level1AnswerIndex = $("#hdnLevel1AnswerIndex").val();
                            Level2QuestionIndex = $("#hdnLevel2QuestionIndex").val();
                            index = parentMultiLevelArray[parentIndex].Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers.findIndex(m => m.Id == selectedAnswerId1);
                            if (index > -1) {
                                controlIndex = parentMultiLevelArray[parentIndex].Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[index].MultiLevelInspectionInputTypeArray.findIndex(m => m.Id == InspectionControlId);
                                if (controlIndex > -1) {
                                    parentMultiLevelArray[parentIndex].Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].Name = inspectionName;
                                    parentMultiLevelArray[parentIndex].Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].CodeStandard = codestandard;
                                    parentMultiLevelArray[parentIndex].Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].IsMetaInfoRequired = isMetaInfo;
                                }
                                if (PInspectionInputTypeArray.length > 0) {
                                    $.each(PInspectionInputTypeArray, function (index) {
                                        parentMultiLevelArray[parentIndex].Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].InspectionControlArray[0].InspectionInputTypeArray.push(PInspectionInputTypeArray[index]);
                                    });
                                }

                                if (FInspectionInputTypeArray.length > 0) {
                                    $.each(FInspectionInputTypeArray, function (index) {
                                        debugger;
                                        parentMultiLevelArray[parentIndex].Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].InspectionControlArray[1].InspectionInputTypeArray.push(FInspectionInputTypeArray[index]);
                                    });
                                }
                            }
                        }
                        else {
                            var sectionId = $("#OldSectionId").val();
                            sectionIndex = SectionDataArray.findIndex(m => m.Id == sectionId);
                            if (sectionIndex > -1) {
                                var parentId = $("#hdnParentMultilevelId1").val();
                                parentIndex = SectionDataArray[sectionIndex].MultiLevelTypeArray.findIndex(m => m.Id == parentId);
                                if (parentIndex > -1) {
                                    Level1AnswerIndex = $("#hdnLevel1AnswerIndex").val();
                                    Level2QuestionIndex = $("#hdnLevel2QuestionIndex").val();
                                    index = SectionDataArray[sectionIndex].MultiLevelTypeArray[parentIndex].Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers.findIndex(m => m.Id == selectedAnswerId1);
                                    if (index > -1) {
                                        controlIndex = SectionDataArray[sectionIndex].MultiLevelTypeArray[parentIndex].Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[index].MultiLevelInspectionInputTypeArray.findIndex(m => m.Id == InspectionControlId);
                                        if (controlIndex > -1) {
                                            SectionDataArray[sectionIndex].MultiLevelTypeArray[parentIndex].Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].Name = inspectionName;
                                            SectionDataArray[sectionIndex].MultiLevelTypeArray[parentIndex].Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].CodeStandard = codestandard;
                                            SectionDataArray[sectionIndex].MultiLevelTypeArray[parentIndex].Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].IsMetaInfoRequired = isMetaInfo;
                                        }
                                        if (PInspectionInputTypeArray.length > 0) {
                                            $.each(PInspectionInputTypeArray, function (index) {
                                                SectionDataArray[sectionIndex].MultiLevelTypeArray[parentIndex].Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].InspectionControlArray[0].InspectionInputTypeArray.push(PInspectionInputTypeArray[index]);
                                            });
                                        }

                                        if (FInspectionInputTypeArray.length > 0) {
                                            $.each(FInspectionInputTypeArray, function (index) {
                                                debugger;
                                                SectionDataArray[sectionIndex].MultiLevelTypeArray[parentIndex].Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].InspectionControlArray[1].InspectionInputTypeArray.push(FInspectionInputTypeArray[index]);
                                            });
                                        }
                                    }
                                }
                            }
                        }
                    }
                   
                }

                renderingDiv = ".multilevel_fields_container_2 #" + InspectionControlId;
                $("#lblHiddenMultilevelInspectionControl2").text("");
            }
            else if (levelId == "InspectionControlLevel3") {
                isObjectEmpty = $.isEmptyObject(multiLevelObject3);
                if (!isObjectEmpty) {
                    index = multiLevelObject3.Answers.findIndex(m => m.Id == selectedAnswerId3);
                    if (index > -1) {
                        var InspectionIndex = multiLevelObject3.Answers[index].MultiLevelInspectionInputTypeArray.findIndex(m => m.Id == InspectionControlId);
                        if (InspectionIndex > -1) {
                            multiLevelObject3.Answers[index].MultiLevelInspectionInputTypeArray[InspectionIndex].Name = inspectionName;
                            multiLevelObject3.Answers[index].MultiLevelInspectionInputTypeArray[InspectionIndex].CodeStandard = codestandard;
                            multiLevelObject3.Answers[index].MultiLevelInspectionInputTypeArray[InspectionIndex].IsMetaInfoRequired = isMetaInfo;
                        }

                        if (PInspectionInputTypeArray.length > 0) {
                            $.each(PInspectionInputTypeArray, function (index) {
                                multiLevelObject3.Answers[index].MultiLevelInspectionInputTypeArray[InspectionIndex].InspectionControlArray[0].InspectionInputTypeArray.push(PInspectionInputTypeArray[index]);
                            });
                        }

                        if (FInspectionInputTypeArray.length > 0) {
                            $.each(FInspectionInputTypeArray, function (index) {
                                debugger;
                                multiLevelObject3.Answers[index].MultiLevelInspectionInputTypeArray[InspectionIndex].InspectionControlArray[1].InspectionInputTypeArray.push(FInspectionInputTypeArray[index]);
                            });
                        }
                    }
                }
                else {
                    var IsLevel2ObjectEmpty = $.isEmptyObject(multiLevelObject2);
                    if (!IsLevel2ObjectEmpty) {
                        Level2AnswerIndex = $("#hdnLevel2AnswerIndex").val();
                        Level3QuestionIndex = $("#hdnLevel3QuestionIndex").val();
                        index = multiLevelObject2.Answers[Level2AnswerIndex].MultiLevelArray[Level3QuestionIndex].Answers.findIndex(m => m.Id == selectedAnswerId3);
                        if (index > -1) {
                            controlIndex = multiLevelObject2.Answers[Level2AnswerIndex].MultiLevelArray[Level3QuestionIndex].Answers[index].MultiLevelInspectionInputTypeArray.findIndex(m => m.Id == InspectionControlId);
                            if (controlIndex > -1) {
                                multiLevelObject2.Answers[Level2AnswerIndex].MultiLevelArray[Level3QuestionIndex].Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].Name = inspectionName;
                                multiLevelObject2.Answers[Level2AnswerIndex].MultiLevelArray[Level3QuestionIndex].Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].CodeStandard = codestandard;
                                multiLevelObject2.Answers[Level2AnswerIndex].MultiLevelArray[Level3QuestionIndex].Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].IsMetaInfoRequired = isMetaInfo;

                                if (PInspectionInputTypeArray.length > 0) {
                                    $.each(PInspectionInputTypeArray, function (index) {
                                        multiLevelObject2.Answers[Level2AnswerIndex].MultiLevelArray[Level3QuestionIndex].Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].InspectionControlArray[0].InspectionInputTypeArray.push(PInspectionInputTypeArray[index]);
                                    });
                                }

                                if (FInspectionInputTypeArray.length > 0) {
                                    $.each(FInspectionInputTypeArray, function (index) {
                                        debugger;
                                        multiLevelObject2.Answers[Level2AnswerIndex].MultiLevelArray[Level3QuestionIndex].Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].InspectionControlArray[1].InspectionInputTypeArray.push(FInspectionInputTypeArray[index]);
                                    });
                                }
                            }
                        }
                    }
                    else {
                        var IsLevel1ObjectEmpty = $.isEmptyObject(multiLevelObject1);
                        if (!IsLevel1ObjectEmpty) {
                            Level1AnswerIndex = $("#hdnLevel1AnswerIndex").val();
                            Level2QuestionIndex = $("#hdnLevel2QuestionIndex").val();
                            Level2AnswerIndex = $("#hdnLevel2AnswerIndex").val();
                            Level3QuestionIndex = $("#hdnLevel3QuestionIndex").val();
                            index = multiLevelObject1.Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[Level2AnswerIndex].MultiLevelArray[Level3QuestionIndex].Answers.findIndex(m => m.Id == selectedAnswerId3);
                            if (index > -1) {
                                controlIndex = multiLevelObject1.Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[Level2AnswerIndex].MultiLevelArray[Level3QuestionIndex].Answers[index].MultiLevelInspectionInputTypeArray.findIndex(m => m.Id == InspectionControlId);
                                if (controlIndex > -1) {
                                    multiLevelObject1.Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[Level2AnswerIndex].MultiLevelArray[Level3QuestionIndex].Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].Name = inspectionName;
                                    multiLevelObject1.Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[Level2AnswerIndex].MultiLevelArray[Level3QuestionIndex].Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].CodeStandard = codestandard;
                                    multiLevelObject1.Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[Level2AnswerIndex].MultiLevelArray[Level3QuestionIndex].Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].IsMetaInfoRequired = isMetaInfo;

                                    if (PInspectionInputTypeArray.length > 0) {
                                        $.each(PInspectionInputTypeArray, function (index) {
                                            multiLevelObject1.Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[Level2AnswerIndex].MultiLevelArray[Level3QuestionIndex].Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].InspectionControlArray[0].InspectionInputTypeArray.push(PInspectionInputTypeArray[index]);
                                        });
                                    }

                                    if (FInspectionInputTypeArray.length > 0) {
                                        $.each(FInspectionInputTypeArray, function (index) {
                                            debugger;
                                            multiLevelObject1.Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[Level2AnswerIndex].MultiLevelArray[Level3QuestionIndex].Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].InspectionControlArray[1].InspectionInputTypeArray.push(FInspectionInputTypeArray[index]);
                                        });
                                    }
                                }
                            }
                        }
                        else {
                            var parentId = $("#hdnParentMultilevelId1").val();
                            parentIndex = parentMultiLevelArray.findIndex(m => m.Id == parentId);
                            if (parentIndex > -1) {
                                Level1AnswerIndex = $("#hdnLevel1AnswerIndex").val();
                                Level2QuestionIndex = $("#hdnLevel2QuestionIndex").val();
                                Level2AnswerIndex = $("#hdnLevel2AnswerIndex").val();
                                Level3QuestionIndex = $("#hdnLevel3QuestionIndex").val();
                                index = parentMultiLevelArray[parentIndex].Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[Level2AnswerIndex].MultiLevelArray[Level3QuestionIndex].Answers.findIndex(m => m.Id == selectedAnswerId3);
                                if (index > -1) {
                                    controlIndex = parentMultiLevelArray[parentIndex].Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[Level2AnswerIndex].MultiLevelArray[Level3QuestionIndex].Answers[index].MultiLevelInspectionInputTypeArray.findIndex(m => m.Id == InspectionControlId);
                                    if (controlIndex > -1) {
                                        parentMultiLevelArray[parentIndex].Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[Level2AnswerIndex].MultiLevelArray[Level3QuestionIndex].Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].Name = inspectionName;
                                        parentMultiLevelArray[parentIndex].Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[Level2AnswerIndex].MultiLevelArray[Level3QuestionIndex].Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].CodeStandard = codestandard;
                                        parentMultiLevelArray[parentIndex].Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[Level2AnswerIndex].MultiLevelArray[Level3QuestionIndex].Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].IsMetaInfoRequired = isMetaInfo;
                                    }
                                    if (PInspectionInputTypeArray.length > 0) {
                                        $.each(PInspectionInputTypeArray, function (index) {
                                            parentMultiLevelArray[parentIndex].Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[Level2AnswerIndex].MultiLevelArray[Level3QuestionIndex].Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].InspectionControlArray[0].InspectionInputTypeArray.push(PInspectionInputTypeArray[index]);
                                        });
                                    }

                                    if (FInspectionInputTypeArray.length > 0) {
                                        $.each(FInspectionInputTypeArray, function (index) {
                                            debugger;
                                            parentMultiLevelArray[parentIndex].Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[Level2AnswerIndex].MultiLevelArray[Level3QuestionIndex].Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].InspectionControlArray[1].InspectionInputTypeArray.push(FInspectionInputTypeArray[index]);
                                        });
                                    }
                                }
                            }
                            else {
                                var sectionId = $("#OldSectionId").val();
                                sectionIndex = SectionDataArray.findIndex(m => m.Id == sectionId);
                                if (sectionIndex > -1) {
                                    var parentId = $("#hdnParentMultilevelId1").val();
                                    parentIndex = SectionDataArray[sectionIndex].MultiLevelTypeArray.findIndex(m => m.Id == parentId);
                                    if (parentIndex > -1) {
                                        Level1AnswerIndex = $("#hdnLevel1AnswerIndex").val();
                                        Level2QuestionIndex = $("#hdnLevel2QuestionIndex").val();
                                        Level2AnswerIndex = $("#hdnLevel2AnswerIndex").val();
                                        Level3QuestionIndex = $("#hdnLevel3QuestionIndex").val();
                                        index = SectionDataArray[sectionIndex].MultiLevelTypeArray[parentIndex].Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[Level2AnswerIndex].MultiLevelArray[Level3QuestionIndex].Answers.findIndex(m => m.Id == selectedAnswerId3);
                                        if (index > -1) {
                                            controlIndex = SectionDataArray[sectionIndex].MultiLevelTypeArray[parentIndex].Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[Level2AnswerIndex].MultiLevelArray[Level3QuestionIndex].Answers[index].MultiLevelInspectionInputTypeArray.findIndex(m => m.Id == InspectionControlId);
                                            if (controlIndex > -1) {
                                                SectionDataArray[sectionIndex].MultiLevelTypeArray[parentIndex].Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[Level2AnswerIndex].MultiLevelArray[Level3QuestionIndex].Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].Name = inspectionName;
                                                SectionDataArray[sectionIndex].MultiLevelTypeArray[parentIndex].Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[Level2AnswerIndex].MultiLevelArray[Level3QuestionIndex].Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].CodeStandard = codestandard;
                                                SectionDataArray[sectionIndex].MultiLevelTypeArray[parentIndex].Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[Level2AnswerIndex].MultiLevelArray[Level3QuestionIndex].Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].IsMetaInfoRequired = isMetaInfo;
                                            }
                                            if (PInspectionInputTypeArray.length > 0) {
                                                $.each(PInspectionInputTypeArray, function (index) {
                                                    SectionDataArray[sectionIndex].MultiLevelTypeArray[parentIndex].Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[Level2AnswerIndex].MultiLevelArray[Level3QuestionIndex].Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].InspectionControlArray[0].InspectionInputTypeArray.push(PInspectionInputTypeArray[index]);
                                                });
                                            }

                                            if (FInspectionInputTypeArray.length > 0) {
                                                $.each(FInspectionInputTypeArray, function (index) {
                                                    debugger;
                                                    SectionDataArray[sectionIndex].MultiLevelTypeArray[parentIndex].Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[Level2AnswerIndex].MultiLevelArray[Level3QuestionIndex].Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].InspectionControlArray[1].InspectionInputTypeArray.push(FInspectionInputTypeArray[index]);
                                                });
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }

                renderingDiv = ".multilevel_fields_container_3 #" + InspectionControlId;
                $("#lblHiddenMultilevelInspectionControl3").text("");
            }

            SortingInspectionComponents(true);
            $(renderingDiv).html("<div class='col-md-12' style='background:#aaa;padding-top:6px;margin-bottom:8px;'><label>Inspection Control Name :</label><label id='lblinspectioncontrolname'>" + inspectionName + "</label>" +
                "<a href='#' class='multilevel_edit_inspection_field' style='margin-left:10px;'>Edit</a>" +
                "<a href='#' class='multilevel_remove_inspection_field' style='margin-left:10px;'>Remove</a></div> <div class='col-md-12'>" +
                "<label>Code Standards :  </label><label id='lblCodeStandardsName'>" + codestandardtext +
                "</label><label id='lblCodeStandardsValue' style='display:none'>" + codestandard + "</label><br>" +
                "<label>GP Info :  </label><label id='lblIsMetaInfo'>" + isMetaInfoText + "</label><br>" +
                "<input type='hidden' id='hdnIsMetaInfo' value=" + isMetaInfo + ">" +
                "<input type='hidden' id='hdnisCheckedAllP' value=" + isCheckedAllP + ">" +
                "<input type='hidden' id='hdnisCheckedAllF' value=" + isCheckedAllF + ">" +
                Inspectionhtmlpart + htmlpart + "</div>");

            $("#IsMultilevelInspectionControlForEdit").val("");
            InspectionControlId = "";
        }
        else {
            SortingInspectionComponents(false);
            GetSetJsonInspectionControlData("P", PInspectionInputTypeArray, $(".Multilevel_Inspection_Control_container #chkPAllPrivateField").prop("checked"));
            GetSetJsonInspectionControlData("F,RR", FInspectionInputTypeArray, $(".Multilevel_Inspection_Control_container #chkFAllPrivateField").prop("checked"));
            var Id = inspectionName.replace(/\s/g, "_") + "_" + FieldCounter;

            GetSetJsonAllInspectionControls(inspectionName, InspectionControlDataArray, codestandard, FieldCounter, Id, isMetaInfo,true);

            var contentId = "";
            var levelId = $("#hdnInspectionControlLevelId").val();
            if (levelId == "InspectionControlLevel1") {
                var index = multiLevelObject1.Answers.findIndex(m => m.Id == selectedAnswerId1);
                if (index > -1) {
                    $.each(MultilevelInspectionInputTypeDataArray, function (levelIndex) {
                        multiLevelObject1.Answers[index].MultiLevelInspectionInputTypeArray.push(MultilevelInspectionInputTypeDataArray[levelIndex]);
                    });
                    renderingDiv = ".multilevel_fields_container_1 #Content_" + selectedAnswerId1;
                }
            }
            else if (levelId == "InspectionControlLevel2") {
                var index = multiLevelObject2.Answers.findIndex(m => m.Id == selectedAnswerId2);
                if (index > -1) {
                    $.each(MultilevelInspectionInputTypeDataArray, function (levelIndex) {
                        multiLevelObject2.Answers[index].MultiLevelInspectionInputTypeArray.push(MultilevelInspectionInputTypeDataArray[levelIndex]);
                    });
                    renderingDiv = ".multilevel_fields_container_2 #Content_" + selectedAnswerId2;
                }
            }
            else if (levelId == "InspectionControlLevel3") {
                var index = multiLevelObject3.Answers.findIndex(m => m.Id == selectedAnswerId3);
                if (index > -1) {
                    $.each(MultilevelInspectionInputTypeDataArray, function (levelIndex) {
                        multiLevelObject3.Answers[index].MultiLevelInspectionInputTypeArray.push(MultilevelInspectionInputTypeDataArray[levelIndex]);
                    });
                    renderingDiv = ".multilevel_fields_container_3 #Content_" + selectedAnswerId3;
                }
            }

            //var contentId = ".multilevel_fields_container_1 #Content_" + selectedAnswerId1;
            $(renderingDiv).append("<div id='" + Id + "' style='border:1px solid #ddd; margin-bottom:10px; margin-top:10px;'><div class='col-md-12' style='background:#aaa;padding-top:6px;margin-bottom:8px;'><label>Inspection Control Name :</label><label id='lblinspectioncontrolname'>" + inspectionName + "</label>" +
                "<a href='#' class='multilevel_edit_inspection_field' style='margin-left:10px;'>Edit</a>" +
                "<a href='#' class='multilevel_remove_inspection_field' style='margin-left:10px;'>Remove</a></div><div class='col-md-12'>" +
                "<label>Code Standards :  </label><label id='lblCodeStandardsName'>" + codestandardtext +
                "</label><label id='lblCodeStandardsValue' style='display:none'>" + codestandard + "</label><br>" +
                "<label>GP Info :  </label><label id='lblIsMetaInfo'>" + isMetaInfoText + "</label><br>" +
                "<input type='hidden' id='hdnIsMetaInfo' value=" + isMetaInfo + ">" +
                "<input type='hidden' id='hdnisCheckedAllP' value=" + isCheckedAllP + ">" +
                "<input type='hidden' id='hdnisCheckedAllF' value=" + isCheckedAllF + ">" +
                Inspectionhtmlpart + htmlpart + "</div></div>");

            FieldCounter = FieldCounter + 1;
        }
        
        ClearMultilevelInspectionControls1();
    });

    //Edit and Remove Controls
    $(".multilevel_fields_container_1").on("click", ".multilevel_edit_field,.multilevel_remove_field,.multilevel_private_field", function () {
        debugger;
        var controlCaption = "";
        var controlOption = "";
        var controlType = "";
        var controlId = $(this).parent().parent().attr('id');
        var className = $(this).attr('class');
        var ischecked = false;

        if (className == "multilevel_private_field") {
            controlId = $(this).parent().parent().parent().attr('id');
            ischecked = $(this).prop("checked");
        }
       
        var isObjectEmpty = $.isEmptyObject(multiLevelObject1);
        var listofindexes = GetIndexes1(isObjectEmpty, controlId);
        index = listofindexes.index; controlIndex = listofindexes.controlIndex; parentIndex = listofindexes.parentIndex;
        sectionIndex = listofindexes.sectionIndex;

        if (!isObjectEmpty) {
            if (className == "multilevel_edit_field") {
                controlType = multiLevelObject1.Answers[index].MultiLevelInputTypeArray[controlIndex].Type;
                controlCaption = multiLevelObject1.Answers[index].MultiLevelInputTypeArray[controlIndex].Caption;
                controlOption = multiLevelObject1.Answers[index].MultiLevelInputTypeArray[controlIndex].Option;
            }
            else if (className == "multilevel_remove_field") {
                multiLevelObject1.Answers[index].MultiLevelInputTypeArray.splice(controlIndex, 1);
            }
            else if (className == "multilevel_private_field") {
                multiLevelObject1.Answers[index].MultiLevelInputTypeArray[controlIndex].IsFieldPrivate = ischecked;
            }

        }
        else {
            if (sectionIndex < 0 || sectionIndex == undefined) {
                if (className == "multilevel_edit_field") {
                    controlType = parentMultiLevelArray[parentIndex].Answers[index].MultiLevelInputTypeArray[controlIndex].Type;
                    controlCaption = parentMultiLevelArray[parentIndex].Answers[index].MultiLevelInputTypeArray[controlIndex].Caption;
                    controlOption = parentMultiLevelArray[parentIndex].Answers[index].MultiLevelInputTypeArray[controlIndex].Option;
                }
                else if (className == "multilevel_remove_field") {
                    parentMultiLevelArray[parentIndex].Answers[index].MultiLevelInputTypeArray.splice(controlIndex, 1);
                }
                else if (className == "multilevel_private_field") {
                    parentMultiLevelArray[parentIndex].Answers[index].MultiLevelInputTypeArray[controlIndex].IsFieldPrivate = ischecked;
                }
            }
            else {
                if (className == "multilevel_edit_field") {
                    controlType = SectionDataArray[sectionIndex].MultiLevelTypeArray[parentIndex].Answers[index].MultiLevelInputTypeArray[controlIndex].Type;
                    controlCaption = SectionDataArray[sectionIndex].MultiLevelTypeArray[parentIndex].Answers[index].MultiLevelInputTypeArray[controlIndex].Caption;
                    controlOption = SectionDataArray[sectionIndex].MultiLevelTypeArray[parentIndex].Answers[index].MultiLevelInputTypeArray[controlIndex].Option;
                }
                else if (className == "multilevel_remove_field") {
                    SectionDataArray[sectionIndex].MultiLevelTypeArray[parentIndex].Answers[index].MultiLevelInputTypeArray.splice(controlIndex, 1);
                }
                else if (className == "multilevel_private_field") {
                    SectionDataArray[sectionIndex].MultiLevelTypeArray[parentIndex].Answers[index].MultiLevelInputTypeArray[controlIndex].IsFieldPrivate = ischecked;
                }
            }
        }

        if (className == "multilevel_edit_field") {
            if (controlType == 'TextBox') {
                if (TextBoxCaptionInput()) {
                    if (parentIndex < 0 || parentIndex == undefined) {
                        multiLevelObject1.Answers[index].MultiLevelInputTypeArray[controlIndex].Caption = TextboxCaption;
                    }
                    else if (sectionIndex < 0 || sectionIndex == undefined) {
                        parentMultiLevelArray[parentIndex].Answers[index].MultiLevelInputTypeArray[controlIndex].Caption = TextboxCaption;
                    }
                    else {
                        SectionDataArray[sectionIndex].MultiLevelTypeArray[parentIndex].Answers[index].MultiLevelInputTypeArray[controlIndex].Caption = TextboxCaption;
                    }

                    $(this).parent().parent().find('#lbltextbox').text(TextboxCaption);
                }
            }
            else {
                $("#lblMultilevelControlCaptionId1").text(controlType);
                $("#txtMultilevelControlCaptionId1").val(controlCaption);
                $("#txtMultilevelControlCaptionOption1").val(controlOption);
                $("#OldMultilevelControlId1").val(controlId);
                $("#IsFieldForEdit1").val(true);
                $("#addMultilevelControlOption1").modal('show');
            }
        }
        else if (className == "multilevel_remove_field") {
            $(this).parent().parent().remove();
        }
        else if (className == "multilevel_private_field") {
            if (ischecked) {
                $(this).attr("checked", "checked");
            }
            else {
                $(this).removeAttr("checked", "checked");
            }
        }
        $("#lblHiddenMultilevelInspectionControl1").text("");
    });

    $(".multilevel_fields_container_1").on("click", ".multilevel_edit_inspection_field,.multilevel_remove_inspection_field", function () {
        debugger;
        var className = $(this).attr('class');
        InspectionControlId = $(this).parent().parent().attr('Id');

        //Edit of Inspection Control at any Level-1
        if (className == "multilevel_edit_inspection_field") {
            $("#ddlmultilevelInspectionStatus").val("Select");
            $("#addmultilevelinspectiontextbox, #addmultilevelinspectiondropdownlist, #addmultilevelinspectioncheckbox, #addmultilevelinspectionradiobutton").addClass("pointernone");
            var InspectionControlName = $(this).parent().parent().find("#lblinspectioncontrolname").text();

            var dvPparent = $(this).parent().parent().find('#dvPparent').html();
            $('.Multilevel_Inspection_Control_container #dvPparent').html(dvPparent).find(".multilevel_edit_field,.multilevel_remove_field,#lblPAllPrivateField").css("display", "inline");

            var dvFparent = $(this).parent().parent().find('#dvFparent').html();
            $('.Multilevel_Inspection_Control_container #dvFparent').html(dvFparent).find(".multilevel_edit_field,.multilevel_remove_field,#lblFAllPrivateField").css("display", "inline");

            $("#ddlmultilevelInspectionCodeStandards").multiselect('deselectAll', false);
            $('#ddlmultilevelInspectionCodeStandards').multiselect('updateButtonText');
            var componentsname = $(this).parent().parent().find("#lblCodeStandardsValue").text();
            if (componentsname != "null") {
                var componentarray = componentsname.split(",");
                $.each(componentarray, function (index, value) {
                    debugger;
                    $("#ddlmultilevelInspectionCodeStandards").multiselect('select', value);
                });
            }

            var metainfo = $(this).parent().parent().find("#hdnIsMetaInfo").val() == "true" ? true : false;
            var isCheckedAllP = $(this).parent().parent().find("#hdnisCheckedAllP").val() == "true" ? true : false;
            var isCheckedAllF = $(this).parent().parent().find("#hdnisCheckedAllF").val() == "true" ? true : false;
            $("#chkMultilevelIsMetaInfo").prop("checked", metainfo);
            $('.Multilevel_Inspection_Control_container #dvPparent,.Multilevel_Inspection_Control_container #dvFparent').removeClass("active");
            $('.Multilevel_Inspection_Control_container').find('.inspection_pointer').removeClass('inspection_pointer');
            $(".Multilevel_Inspection_Control_container #dvP,.Multilevel_Inspection_Control_container #dvF").sortable();
            $(".Multilevel_Inspection_Control_container #chkPAllMultilevelPrivateField").prop("checked", isCheckedAllP);
            $(".Multilevel_Inspection_Control_container #chkFAllMultilevelPrivateField").prop("checked", isCheckedAllF);
            $("#IsMultilevelInspectionControlForEdit").val(true);
            $("#MultilevelInspectionControlId").val(InspectionControlName);
            $("#hdnInspectionControlLevelId").val("InspectionControlLevel1");
            $("#addMultilevelInspection").modal('show');

        }

        //Removal of Inspection Control at any Level-1
        else if (className == "multilevel_remove_inspection_field") {
            var isObjectEmpty = $.isEmptyObject(multiLevelObject1);
            if (!isObjectEmpty) {
                index = multiLevelObject1.Answers.findIndex(m => m.Id == selectedAnswerId1);
                if (index > -1) {
                    InspectionControlIndex = multiLevelObject1.Answers[index].MultiLevelInspectionInputTypeArray.findIndex(m => m.Id == InspectionControlId);
                    if (InspectionControlIndex > -1) {
                        multiLevelObject1.Answers[index].MultiLevelInspectionInputTypeArray.splice(InspectionControlIndex, 1);
                    }
                }
            }
            else {
                var parentId = $("#hdnParentMultilevelId1").val();
                parentIndex = parentMultiLevelArray.findIndex(m => m.Id == parentId);
                if (parentIndex > -1) {
                    index = parentMultiLevelArray[parentIndex].Answers.findIndex(m => m.Id == selectedAnswerId1);
                    if (index > -1) {
                        controlIndex = parentMultiLevelArray[parentIndex].Answers[index].MultiLevelInspectionInputTypeArray.findIndex(m => m.Id == InspectionControlId);
                        if (controlIndex > -1) {
                            parentMultiLevelArray[parentIndex].Answers[index].MultiLevelInspectionInputTypeArray.splice(controlIndex, 1);
                        }
                    }
                }
                else {
                    var sectionId = $("#OldSectionId").val();
                    sectionIndex = SectionDataArray.findIndex(m => m.Id == sectionId);
                    if (sectionIndex > -1) {
                        var parentId = $("#hdnParentMultilevelId1").val();
                        parentIndex = SectionDataArray[sectionIndex].MultiLevelTypeArray.findIndex(m => m.Id == parentId);
                        if (parentIndex > -1) {
                            index = SectionDataArray[sectionIndex].MultiLevelTypeArray[parentIndex].Answers.findIndex(m => m.Id == selectedAnswerId1);
                            if (index > -1) {
                                controlIndex = SectionDataArray[sectionIndex].MultiLevelTypeArray[parentIndex].Answers[index].MultiLevelInspectionInputTypeArray.findIndex(m => m.Id == InspectionControlId);
                                if (controlIndex > -1) {
                                    SectionDataArray[sectionIndex].MultiLevelTypeArray[parentIndex].Answers[index].MultiLevelInspectionInputTypeArray.splice(controlIndex, 1);
                                }
                            }
                        }
                    }
                }
            }

            $(this).parent().parent().parent().remove();
        }

    });

    $(".Multilevel_Inspection_Control_container").on("click", ".multilevel_edit_field,.multilevel_remove_field,.multilevel_private_field", function () {
        debugger;
        var controlCaption = "";
        var controlOption = "";
        var controlType = "";

        var ischecked = false;
        var isObjectEmpty = false;
        var controlId = $(this).parent().parent().attr('id');
        var className = $(this).attr('class');

        if (className == "multilevel_private_field") {
            controlId = $(this).parent().parent().parent().attr('id');
            ischecked = $(this).prop("checked");
        }


        var CurrentSelectedStatus = $("#ddlmultilevelInspectionStatus").val();
        var dvToRender = GetDivId(CurrentSelectedStatus);
     
        var levelId = $("#hdnInspectionControlLevelId").val();
        var listofindexes = {};
        if (levelId == "InspectionControlLevel1") {
            isObjectEmpty = $.isEmptyObject(multiLevelObject1);
            listofindexes = GetIndexes1(isObjectEmpty, controlId, true, CurrentSelectedStatus);
        }
        else if (levelId == "InspectionControlLevel2") {
            isObjectEmpty = $.isEmptyObject(multiLevelObject2);
            listofindexes = GetIndexes2(isObjectEmpty, controlId, true, CurrentSelectedStatus);
        }
        else if (levelId == "InspectionControlLevel3") {
            isObjectEmpty = $.isEmptyObject(multiLevelObject3);
            listofindexes = GetIndexes3(isObjectEmpty, controlId, true, CurrentSelectedStatus);
        }

        Level2AnswerIndex = listofindexes.Level2AnswerIndex; Level3QuestionIndex = listofindexes.Level3QuestionIndex;
        Level1AnswerIndex = listofindexes.Level1AnswerIndex; Level2QuestionIndex = listofindexes.Level2QuestionIndex;
        index = listofindexes.index; controlIndex = listofindexes.controlIndex; parentIndex = listofindexes.parentIndex;
        InspectionIndex = listofindexes.InspectionIndex; InspectionFieldIndex = listofindexes.InspectionFieldIndex;
        currentSelectedStatusIndex = listofindexes.currentSelectedStatusIndex; sectionIndex = listofindexes.sectionIndex;

        if (InspectionIndex > -1) {
            switch (CurrentSelectedStatus) {
                case 'P':
                    if (className == "multilevel_edit_field") {
                        controlType = PInspectionInputTypeArray[InspectionIndex].Type;
                        controlOption = PInspectionInputTypeArray[InspectionIndex].Option;
                        controlCaption = PInspectionInputTypeArray[InspectionIndex].Caption;
                    }
                    else if (className == "multilevel_remove_field") {
                        PInspectionInputTypeArray.splice(InspectionIndex, 1);
                    }
                    else if (className == "multilevel_private_field") {
                        PInspectionInputTypeArray[InspectionIndex].IsFieldPrivate = ischecked;
                    }

                    break;
                case 'F':
                    if (className == "multilevel_edit_field") {
                        controlType = FInspectionInputTypeArray[InspectionIndex].Type;
                        controlOption = FInspectionInputTypeArray[InspectionIndex].Option;
                        controlCaption = FInspectionInputTypeArray[InspectionIndex].Caption;
                    }
                    else if (className == "multilevel_remove_field") {
                        FInspectionInputTypeArray.splice(InspectionIndex, 1);
                    }
                    else if (className == "multilevel_private_field") {
                        FInspectionInputTypeArray[InspectionIndex].IsFieldPrivate = ischecked;
                    }
                    break;
                default: break;
            }
        }
        else {
            if (levelId == "InspectionControlLevel1") {
                if (!isObjectEmpty) {
                    if (className == "multilevel_edit_field") {
                        controlType = multiLevelObject1.Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].InspectionControlArray[currentSelectedStatusIndex].InspectionInputTypeArray[InspectionFieldIndex].Type;
                        controlOption = multiLevelObject1.Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].InspectionControlArray[currentSelectedStatusIndex].InspectionInputTypeArray[InspectionFieldIndex].Option;
                        controlCaption = multiLevelObject1.Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].InspectionControlArray[currentSelectedStatusIndex].InspectionInputTypeArray[InspectionFieldIndex].Caption;
                    }
                    else if (className == "multilevel_remove_field") {
                        multiLevelObject1.Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].InspectionControlArray[currentSelectedStatusIndex].InspectionInputTypeArray.splice(InspectionFieldIndex, 1);
                    }
                    else if (className == "multilevel_private_field") {
                        multiLevelObject1.Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].InspectionControlArray[currentSelectedStatusIndex].InspectionInputTypeArray[InspectionFieldIndex].IsFieldPrivate = ischecked;
                    }

                }
                else {
                    if (sectionIndex < 0 || sectionIndex == undefined) {
                        if (className == "multilevel_edit_field") {
                            controlType = parentMultiLevelArray[parentIndex].Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].InspectionControlArray[currentSelectedStatusIndex].InspectionInputTypeArray[InspectionFieldIndex].Type;
                            controlOption = parentMultiLevelArray[parentIndex].Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].InspectionControlArray[currentSelectedStatusIndex].InspectionInputTypeArray[InspectionFieldIndex].Option;
                            controlCaption = parentMultiLevelArray[parentIndex].Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].InspectionControlArray[currentSelectedStatusIndex].InspectionInputTypeArray[InspectionFieldIndex].Caption;
                        }
                        else if (className == "multilevel_remove_field") {
                            parentMultiLevelArray[parentIndex].Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].InspectionControlArray[currentSelectedStatusIndex].InspectionInputTypeArray.splice(InspectionFieldIndex, 1);
                        }
                        else if (className == "multilevel_private_field") {
                            parentMultiLevelArray[parentIndex].Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].InspectionControlArray[currentSelectedStatusIndex].InspectionInputTypeArray[InspectionFieldIndex].IsFieldPrivate = ischecked;
                        }
                    }
                    else {
                        if (className == "multilevel_edit_field") {
                            controlType = SectionDataArray[sectionIndex].MultiLevelTypeArray[parentIndex].Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].InspectionControlArray[currentSelectedStatusIndex].InspectionInputTypeArray[InspectionFieldIndex].Type;
                            controlOption = SectionDataArray[sectionIndex].MultiLevelTypeArray[parentIndex].Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].InspectionControlArray[currentSelectedStatusIndex].InspectionInputTypeArray[InspectionFieldIndex].Option;
                            controlCaption = SectionDataArray[sectionIndex].MultiLevelTypeArray[parentIndex].Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].InspectionControlArray[currentSelectedStatusIndex].InspectionInputTypeArray[InspectionFieldIndex].Caption;
                        }
                        else if (className == "multilevel_remove_field") {
                            SectionDataArray[sectionIndex].MultiLevelTypeArray[parentIndex].Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].InspectionControlArray[currentSelectedStatusIndex].InspectionInputTypeArray.splice(InspectionFieldIndex, 1);
                        }
                        else if (className == "multilevel_private_field") {
                            SectionDataArray[sectionIndex].MultiLevelTypeArray[parentIndex].Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].InspectionControlArray[currentSelectedStatusIndex].InspectionInputTypeArray[InspectionFieldIndex].IsFieldPrivate = ischecked;
                        }
                    }
                }
            }
            else if (levelId == "InspectionControlLevel2") {
                if (!isObjectEmpty) {
                    if (className == "multilevel_edit_field") {
                        controlType = multiLevelObject2.Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].InspectionControlArray[currentSelectedStatusIndex].InspectionInputTypeArray[InspectionFieldIndex].Type;
                        controlOption = multiLevelObject2.Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].InspectionControlArray[currentSelectedStatusIndex].InspectionInputTypeArray[InspectionFieldIndex].Option;
                        controlCaption = multiLevelObject2.Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].InspectionControlArray[currentSelectedStatusIndex].InspectionInputTypeArray[InspectionFieldIndex].Caption;
                    }
                    else if (className == "multilevel_remove_field") {
                        multiLevelObject2.Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].InspectionControlArray[currentSelectedStatusIndex].InspectionInputTypeArray.splice(InspectionFieldIndex, 1);
                    }
                    else if (className == "multilevel_private_field") {
                        multiLevelObject2.Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].InspectionControlArray[currentSelectedStatusIndex].InspectionInputTypeArray[InspectionFieldIndex].IsFieldPrivate = ischecked;
                    }

                }
                else {
                    if (parentIndex < 0 || parentIndex == undefined) {
                        if (className == "multilevel_edit_field") {
                            controlType = multiLevelObject1.Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].InspectionControlArray[currentSelectedStatusIndex].InspectionInputTypeArray[InspectionFieldIndex].Type;
                            controlOption = multiLevelObject1.Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].InspectionControlArray[currentSelectedStatusIndex].InspectionInputTypeArray[InspectionFieldIndex].Option;
                            controlCaption = multiLevelObject1.Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].InspectionControlArray[currentSelectedStatusIndex].InspectionInputTypeArray[InspectionFieldIndex].Caption;
                        }
                        else if (className == "multilevel_remove_field") {
                            multiLevelObject1.Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].InspectionControlArray[currentSelectedStatusIndex].InspectionInputTypeArray.splice(InspectionFieldIndex, 1);
                        }
                        else if (className == "multilevel_private_field") {
                            multiLevelObject1.Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].InspectionControlArray[currentSelectedStatusIndex].InspectionInputTypeArray[InspectionFieldIndex].IsFieldPrivate = ischecked;
                        }
                    }
                    else {
                        if (sectionIndex < 0 || sectionIndex == undefined) {
                            if (className == "multilevel_edit_field") {
                                controlType = parentMultiLevelArray[parentIndex].Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].InspectionControlArray[currentSelectedStatusIndex].InspectionInputTypeArray[InspectionFieldIndex].Type;
                                controlOption = parentMultiLevelArray[parentIndex].Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].InspectionControlArray[currentSelectedStatusIndex].InspectionInputTypeArray[InspectionFieldIndex].Option;
                                controlCaption = parentMultiLevelArray[parentIndex].Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].InspectionControlArray[currentSelectedStatusIndex].InspectionInputTypeArray[InspectionFieldIndex].Caption;
                            }
                            else if (className == "multilevel_remove_field") {
                                parentMultiLevelArray[parentIndex].Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].InspectionControlArray[currentSelectedStatusIndex].InspectionInputTypeArray.splice(InspectionFieldIndex, 1);
                            }
                            else if (className == "multilevel_private_field") {
                                parentMultiLevelArray[parentIndex].Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].InspectionControlArray[currentSelectedStatusIndex].InspectionInputTypeArray[InspectionFieldIndex].IsFieldPrivate = ischecked;
                            }
                        }
                        else {
                            if (className == "multilevel_edit_field") {
                                controlType = SectionDataArray[sectionIndex].MultiLevelTypeArray[parentIndex].Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].InspectionControlArray[currentSelectedStatusIndex].InspectionInputTypeArray[InspectionFieldIndex].Type;
                                controlOption = SectionDataArray[sectionIndex].MultiLevelTypeArray[parentIndex].Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].InspectionControlArray[currentSelectedStatusIndex].InspectionInputTypeArray[InspectionFieldIndex].Option;
                                controlCaption = SectionDataArray[sectionIndex].MultiLevelTypeArray[parentIndex].Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].InspectionControlArray[currentSelectedStatusIndex].InspectionInputTypeArray[InspectionFieldIndex].Caption;
                            }
                            else if (className == "multilevel_remove_field") {
                                SectionDataArray[sectionIndex].MultiLevelTypeArray[parentIndex].Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].InspectionControlArray[currentSelectedStatusIndex].InspectionInputTypeArray.splice(InspectionFieldIndex, 1);
                            }
                            else if (className == "multilevel_private_field") {
                                SectionDataArray[sectionIndex].MultiLevelTypeArray[parentIndex].Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].InspectionControlArray[currentSelectedStatusIndex].InspectionInputTypeArray[InspectionFieldIndex].IsFieldPrivate = ischecked;
                            }
                        }
                    }
                }
            }
            else if (levelId == "InspectionControlLevel3") {
                debugger;
                if (!isObjectEmpty) {
                    if (className == "multilevel_edit_field") {
                        controlType = multiLevelObject3.Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].InspectionControlArray[currentSelectedStatusIndex].InspectionInputTypeArray[InspectionFieldIndex].Type;
                        controlOption = multiLevelObject3.Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].InspectionControlArray[currentSelectedStatusIndex].InspectionInputTypeArray[InspectionFieldIndex].Option;
                        controlCaption = multiLevelObject3.Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].InspectionControlArray[currentSelectedStatusIndex].InspectionInputTypeArray[InspectionFieldIndex].Caption;
                    }
                    else if (className == "multilevel_remove_field") {
                        multiLevelObject3.Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].InspectionControlArray[currentSelectedStatusIndex].InspectionInputTypeArray.splice(InspectionFieldIndex, 1);
                    }
                    else if (className == "multilevel_private_field") {
                        multiLevelObject3.Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].InspectionControlArray[currentSelectedStatusIndex].InspectionInputTypeArray[InspectionFieldIndex].IsFieldPrivate = ischecked;
                    }
                }
                else { 
                    if (Level2QuestionIndex < 0 || Level2QuestionIndex == undefined) {
                        if (className == "multilevel_edit_field") {
                            controlType = multiLevelObject2.Answers[Level2AnswerIndex].MultiLevelArray[Level3QuestionIndex].Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].InspectionControlArray[currentSelectedStatusIndex].InspectionInputTypeArray[InspectionFieldIndex].Type;
                            controlOption = multiLevelObject2.Answers[Level2AnswerIndex].MultiLevelArray[Level3QuestionIndex].Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].InspectionControlArray[currentSelectedStatusIndex].InspectionInputTypeArray[InspectionFieldIndex].Option;
                            controlCaption = multiLevelObject2.Answers[Level2AnswerIndex].MultiLevelArray[Level3QuestionIndex].Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].InspectionControlArray[currentSelectedStatusIndex].InspectionInputTypeArray[InspectionFieldIndex].Caption;
                        }
                        else if (className == "multilevel_remove_field") {
                            multiLevelObject2.Answers[Level2AnswerIndex].MultiLevelArray[Level3QuestionIndex].Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].InspectionControlArray[currentSelectedStatusIndex].InspectionInputTypeArray.splice(InspectionFieldIndex, 1);
                        }
                        else if (className == "multilevel_private_field") {
                            controlCaption = multiLevelObject2.Answers[Level2AnswerIndex].MultiLevelArray[Level3QuestionIndex].Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].InspectionControlArray[currentSelectedStatusIndex].InspectionInputTypeArray[InspectionFieldIndex].IsFieldPrivate = ischecked;
                        }
                    }
                    else {
                        if (parentIndex < 0 || parentIndex == undefined) {
                            if (className == "multilevel_edit_field") {
                                controlType = multiLevelObject1.Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[Level2AnswerIndex].MultiLevelArray[Level3QuestionIndex].Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].InspectionControlArray[currentSelectedStatusIndex].InspectionInputTypeArray[InspectionFieldIndex].Type;
                                controlOption = multiLevelObject1.Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[Level2AnswerIndex].MultiLevelArray[Level3QuestionIndex].Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].InspectionControlArray[currentSelectedStatusIndex].InspectionInputTypeArray[InspectionFieldIndex].Option;
                                controlCaption = multiLevelObject1.Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[Level2AnswerIndex].MultiLevelArray[Level3QuestionIndex].Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].InspectionControlArray[currentSelectedStatusIndex].InspectionInputTypeArray[InspectionFieldIndex].Caption;
                            }
                            else if (className == "multilevel_remove_field") {
                                multiLevelObject1.Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[Level2AnswerIndex].MultiLevelArray[Level3QuestionIndex].Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].InspectionControlArray[currentSelectedStatusIndex].InspectionInputTypeArray.splice(InspectionFieldIndex, 1);
                            }
                            else if (className == "multilevel_private_field") {
                                multiLevelObject1.Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[Level2AnswerIndex].MultiLevelArray[Level3QuestionIndex].Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].InspectionControlArray[currentSelectedStatusIndex].InspectionInputTypeArray[InspectionFieldIndex].IsFieldPrivate = ischecked;
                            }
                        }
                        else {
                            if (sectionIndex < 0 || sectionIndex == undefined) {
                                if (className == "multilevel_edit_field") {
                                    controlType = parentMultiLevelArray[parentIndex].Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[Level2AnswerIndex].MultiLevelArray[Level3QuestionIndex].Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].InspectionControlArray[currentSelectedStatusIndex].InspectionInputTypeArray[InspectionFieldIndex].Type;
                                    controlOption = parentMultiLevelArray[parentIndex].Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[Level2AnswerIndex].MultiLevelArray[Level3QuestionIndex].Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].InspectionControlArray[currentSelectedStatusIndex].InspectionInputTypeArray[InspectionFieldIndex].Option;
                                    controlCaption = parentMultiLevelArray[parentIndex].Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[Level2AnswerIndex].MultiLevelArray[Level3QuestionIndex].Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].InspectionControlArray[currentSelectedStatusIndex].InspectionInputTypeArray[InspectionFieldIndex].Caption;
                                }
                                else if (className == "multilevel_remove_field") {
                                    parentMultiLevelArray[parentIndex].Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[Level2AnswerIndex].MultiLevelArray[Level3QuestionIndex].Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].InspectionControlArray[currentSelectedStatusIndex].InspectionInputTypeArray.splice(InspectionFieldIndex, 1);
                                }
                                else if (className == "multilevel_private_field") {
                                    parentMultiLevelArray[parentIndex].Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[Level2AnswerIndex].MultiLevelArray[Level3QuestionIndex].Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].InspectionControlArray[currentSelectedStatusIndex].InspectionInputTypeArray[InspectionFieldIndex].IsFieldPrivate = ischecked;
                                }
                            }
                            else {
                                if (className == "multilevel_edit_field") {
                                    controlType = SectionDataArray[sectionIndex].MultiLevelTypeArray[parentIndex].Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[Level2AnswerIndex].MultiLevelArray[Level3QuestionIndex].Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].InspectionControlArray[currentSelectedStatusIndex].InspectionInputTypeArray[InspectionFieldIndex].Type;
                                    controlOption = SectionDataArray[sectionIndex].MultiLevelTypeArray[parentIndex].Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[Level2AnswerIndex].MultiLevelArray[Level3QuestionIndex].Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].InspectionControlArray[currentSelectedStatusIndex].InspectionInputTypeArray[InspectionFieldIndex].Option;
                                    controlCaption = SectionDataArray[sectionIndex].MultiLevelTypeArray[parentIndex].Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[Level2AnswerIndex].MultiLevelArray[Level3QuestionIndex].Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].InspectionControlArray[currentSelectedStatusIndex].InspectionInputTypeArray[InspectionFieldIndex].Caption;
                                }
                                else if (className == "multilevel_remove_field") {
                                    SectionDataArray[sectionIndex].MultiLevelTypeArray[parentIndex].Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[Level2AnswerIndex].MultiLevelArray[Level3QuestionIndex].Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].InspectionControlArray[currentSelectedStatusIndex].InspectionInputTypeArray.splice(InspectionFieldIndex, 1);
                                }
                                else if (className == "multilevel_private_field") {
                                    SectionDataArray[sectionIndex].MultiLevelTypeArray[parentIndex].Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[Level2AnswerIndex].MultiLevelArray[Level3QuestionIndex].Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].InspectionControlArray[currentSelectedStatusIndex].InspectionInputTypeArray[InspectionFieldIndex].IsFieldPrivate = ischecked;
                                }
                            }
                        }
                    }
                }
            }
        }

        if (className == "multilevel_edit_field") {
            if (controlType == 'TextBox') {
                if (TextBoxCaptionInput()) {
                    if (InspectionIndex > -1) {
                        switch (CurrentSelectedStatus) {
                            case 'P': PInspectionInputTypeArray[InspectionIndex].Caption = TextboxCaption; break;
                            case 'F': FInspectionInputTypeArray[InspectionIndex].Caption = TextboxCaption; break;
                            default: break;
                        }
                    }
                    else {
                        if (levelId == "InspectionControlLevel1") {
                            if (!isObjectEmpty) {
                                multiLevelObject1.Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].InspectionControlArray[currentSelectedStatusIndex].InspectionInputTypeArray[InspectionFieldIndex].Caption = TextboxCaption;
                            }
                            else if (sectionIndex < 0 || sectionIndex == undefined) {
                                parentMultiLevelArray[parentIndex].Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].InspectionControlArray[currentSelectedStatusIndex].InspectionInputTypeArray[InspectionFieldIndex].Caption = TextboxCaption;
                            }
                            else {
                                SectionDataArray[sectionIndex].MultiLevelTypeArray[parentIndex].Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].InspectionControlArray[currentSelectedStatusIndex].InspectionInputTypeArray[InspectionFieldIndex].Caption = TextboxCaption;
                            }
                        }
                        else if (levelId == "InspectionControlLevel2") {
                            if (!isObjectEmpty) {
                                multiLevelObject2.Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].InspectionControlArray[currentSelectedStatusIndex].InspectionInputTypeArray[InspectionFieldIndex].Caption = TextboxCaption;
                            }
                            else if (parentIndex < 0 || parentIndex == undefined) {
                                multiLevelObject1.Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].InspectionControlArray[currentSelectedStatusIndex].InspectionInputTypeArray[InspectionFieldIndex].Caption = TextboxCaption;
                            }
                            else if (sectionIndex < 0 || sectionIndex == undefined) {
                                parentMultiLevelArray[parentIndex].Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].InspectionControlArray[currentSelectedStatusIndex].InspectionInputTypeArray[InspectionFieldIndex].Caption = TextboxCaption;
                            }
                            else {
                                SectionDataArray[sectionIndex].MultiLevelTypeArray[parentIndex].Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].InspectionControlArray[currentSelectedStatusIndex].InspectionInputTypeArray[InspectionFieldIndex].Caption = TextboxCaption;
                            }
                        }
                        else if (levelId == "InspectionControlLevel3") {
                            if (!isObjectEmpty) {
                                multiLevelObject3.Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].InspectionControlArray[currentSelectedStatusIndex].InspectionInputTypeArray[InspectionFieldIndex].Caption = TextboxCaption;
                            } 
                            else if (Level2QuestionIndex < 0 || Level2QuestionIndex == undefined) {
                                multiLevelObject2.Answers[Level2AnswerIndex].MultiLevelArray[Level3QuestionIndex].Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].InspectionControlArray[currentSelectedStatusIndex].InspectionInputTypeArray[InspectionFieldIndex].Caption = TextboxCaption;
                            }
                            else if (parentIndex < 0 || parentIndex == undefined) {
                                multiLevelObject1.Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[Level2AnswerIndex].MultiLevelArray[Level3QuestionIndex].Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].InspectionControlArray[currentSelectedStatusIndex].InspectionInputTypeArray[InspectionFieldIndex].Caption = TextboxCaption;
                            }
                            else if (sectionIndex < 0 || sectionIndex == undefined) {
                                parentMultiLevelArray[parentIndex].Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[Level2AnswerIndex].MultiLevelArray[Level3QuestionIndex].Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].InspectionControlArray[currentSelectedStatusIndex].InspectionInputTypeArray[InspectionFieldIndex].Caption = TextboxCaption;
                            }
                            else {
                                SectionDataArray[sectionIndex].MultiLevelTypeArray[parentIndex].Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[Level2AnswerIndex].MultiLevelArray[Level3QuestionIndex].Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].InspectionControlArray[currentSelectedStatusIndex].InspectionInputTypeArray[InspectionFieldIndex].Caption = TextboxCaption;
                            }
                        }
                        
                    }
                    $(this).parent().parent().find('#lbltextbox').text(TextboxCaption);
                }
            }
            else {
                if (levelId == "InspectionControlLevel1") {
                    $("#lblMultilevelControlCaptionId1").text(controlType);
                    $("#txtMultilevelControlCaptionId1").val(controlCaption);
                    $("#txtMultilevelControlCaptionOption1").val(controlOption);
                    $("#OldMultilevelControlId1").val(controlId);
                    $("#IsFieldForEdit1").val(true);
                    $("#addMultilevelControlOption1").modal('show');
                    $("#lblHiddenMultilevelInspectionControl1").text("InspectionControl");
                }
                else if (levelId == "InspectionControlLevel2") {
                    $("#lblMultilevelControlCaptionId2").text(controlType);
                    $("#txtMultilevelControlCaptionId2").val(controlCaption);
                    $("#txtMultilevelControlCaptionOption2").val(controlOption);
                    $("#OldMultilevelControlId2").val(controlId);
                    $("#IsFieldForEdit2").val(true);
                    $("#addMultilevelControlOption2").modal('show');
                    $("#lblHiddenMultilevelInspectionControl2").text("InspectionControl");
                }
                else if (levelId == "InspectionControlLevel3") {
                    $("#lblMultilevelControlCaptionId3").text(controlType);
                    $("#txtMultilevelControlCaptionId3").val(controlCaption);
                    $("#txtMultilevelControlCaptionOption3").val(controlOption);
                    $("#OldMultilevelControlId3").val(controlId);
                    $("#IsFieldForEdit3").val(true);
                    $("#addMultilevelControlOption3").modal('show');
                    $("#lblHiddenMultilevelInspectionControl3").text("InspectionControl");
                }
            }
        }
        else if (className == "multilevel_remove_field"){
            $(this).parent().parent().remove();
        }
        else if (className == "multilevel_private_field") {
            if (ischecked) {
                $(this).attr("checked", "checked");
            }
            else {
                $(this).removeAttr("checked", "checked");
                switch (CurrentSelectedStatus) {
                    case 'P': $(".Multilevel_Inspection_Control_container #chkPAllMultilevelPrivateField").removeAttr("checked", "checked").prop("checked", false); break;
                    case 'F': $(".Multilevel_Inspection_Control_container #chkFAllMultilevelPrivateField").removeAttr("checked", "checked").prop("checked", false); break;
                    default: break;
                }
            }
        }
    });

    $(".multilevel_fields_container_1").on("click", ".edit_multilevel_field_2,.remove_multilevel_field_2", function () {
        debugger;
        var questionId = $(this).parent().parent().attr('Id');
        var question = "";
        var options = [];
        var Level1AnswerIndex = "";
        var Level2QuestionIndex = "";
        var className = $(this).attr('class');
        var IsObjectEmpty = $.isEmptyObject(multiLevelObject1);
        if (!IsObjectEmpty) {
            Level1AnswerIndex = multiLevelObject1.Answers.findIndex(m => m.Id == selectedAnswerId1);
            if (Level1AnswerIndex > -1) {
                Level2QuestionIndex = multiLevelObject1.Answers[Level1AnswerIndex].MultiLevelArray.findIndex(m => m.Id == questionId);
                if (Level2QuestionIndex > -1) {
                    if (className == "edit_multilevel_field_2") {
                        question = multiLevelObject1.Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Question;
                        $.each(multiLevelObject1.Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers, function (index) {
                            debugger;
                            options.push({
                                Text: multiLevelObject1.Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[index].FieldCaption,
                                Value: multiLevelObject1.Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[index].Id
                            });
                        });
                    }
                    else if (className == "remove_multilevel_field_2") {
                        multiLevelObject1.Answers[Level1AnswerIndex].MultiLevelArray.splice(Level2QuestionIndex, 1);
                    }
                }
            }
        }
        else {
            var parentId = $("#hdnParentMultilevelId1").val();
            var parentIndex = parentMultiLevelArray.findIndex(m => m.Id == parentId);
            if (parentIndex > -1) {
                Level1AnswerIndex = parentMultiLevelArray[parentIndex].Answers.findIndex(m => m.Id == selectedAnswerId1);
                if (Level1AnswerIndex > -1) {
                    Level2QuestionIndex = parentMultiLevelArray[parentIndex].Answers[Level1AnswerIndex].MultiLevelArray.findIndex(m => m.Id == questionId);
                    if (Level2QuestionIndex > -1) {
                        if (className == "edit_multilevel_field_2") {
                            question = parentMultiLevelArray[parentIndex].Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Question;
                            $.each(parentMultiLevelArray[parentIndex].Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers, function (index) {
                                debugger;
                                options.push({
                                    Text: parentMultiLevelArray[parentIndex].Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[index].FieldCaption,
                                    Value: parentMultiLevelArray[parentIndex].Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[index].Id
                                });
                            });
                        }
                        else if (className == "remove_multilevel_field_2") {
                            parentMultiLevelArray[parentIndex].Answers[Level1AnswerIndex].MultiLevelArray.splice(Level2QuestionIndex, 1);
                        }
                       
                    }
                }
            }
            else {
                var sectionId = $("#OldSectionId").val();
                sectionIndex = SectionDataArray.findIndex(m => m.Id == sectionId);
                if (sectionIndex > -1) {
                    var parentId = $("#hdnParentMultilevelId1").val();
                    parentIndex = SectionDataArray[sectionIndex].MultiLevelTypeArray.findIndex(m => m.Id == parentId);
                    if (parentIndex > -1) {
                        Level1AnswerIndex = SectionDataArray[sectionIndex].MultiLevelTypeArray[parentIndex].Answers.findIndex(m => m.Id == selectedAnswerId1);
                        if (Level1AnswerIndex > -1) {
                            Level2QuestionIndex = SectionDataArray[sectionIndex].MultiLevelTypeArray[parentIndex].Answers[Level1AnswerIndex].MultiLevelArray.findIndex(m => m.Id == questionId);
                            if (Level2QuestionIndex > -1) {
                                if (className == "edit_multilevel_field_2") {
                                    question = SectionDataArray[sectionIndex].MultiLevelTypeArray[parentIndex].Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Question;
                                    $.each(SectionDataArray[sectionIndex].MultiLevelTypeArray[parentIndex].Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers, function (index) {
                                        debugger;
                                        options.push({
                                            Text: SectionDataArray[sectionIndex].MultiLevelTypeArray[parentIndex].Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[index].FieldCaption,
                                            Value: SectionDataArray[sectionIndex].MultiLevelTypeArray[parentIndex].Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[index].Id
                                        });
                                    });
                                }
                                else if (className == "remove_multilevel_field_2") {
                                    SectionDataArray[sectionIndex].MultiLevelTypeArray[parentIndex].Answers[Level1AnswerIndex].MultiLevelArray.splice(Level2QuestionIndex, 1);
                                }
                            }
                        }
                    }
                }
            }
        }

        if (className == "edit_multilevel_field_2") {
            $("#txtMultilevelQuestion2").val(question);
            $("#ddlMultilevelAnswer2").empty().append('<option value="" selected disabled>Select</option>');

            var htmlpart = $(this).parent().parent().find('.final_multilevel_container_2').html();

            $("#hdnParentMultilevelId2").val(questionId);
            $(".multilevel_fields_container_2").html(htmlpart);

            var divIds = $.map($(".multilevel_fields_container_2").children("div[id]"), function (e, i) {
                return $(e).attr('id');
            });

            $.each(divIds, function (index) {
                $(".multilevel_fields_container_2 #" + divIds[index]).sortable();
            });

            $.each(options, function (index) {
                $("#ddlMultilevelAnswer2").append("<option value=" + options[index].Value + ">" + options[index].Text + "</option>");
                $(".multilevel_fields_container_2 div[id=Content_" + options[index].Value + "]").css("display", "none");
            });
            $(".multilevel_fields_container_2").parent().parent().find('.multilevel_edit_field,.multilevel_edit_inspection_field,.multilevel_remove_field,.multilevel_remove_inspection_field').css("display", "inline");
            $(".multilevel_fields_container_2").parent().parent().find('#dvPparent .multilevel_edit_field,#dvFparent .multilevel_edit_field,#dvPparent .multilevel_remove_field,#dvFparent .multilevel_remove_field').css("display", "none");

            $(".multilevel_fields_container_2").find('.field_pointer').removeClass('field_pointer');
            $(".multilevel_fields_container_2 .final_multilevel_container_3").find('.field_pointeraction').addClass('field_pointer');

            $("#btnMultilevelAnswer2").attr("disabled", true);
            $(".inputControls_2").addClass("pointernone");
            $("#hdnLevel1AnswerIndex").val(Level1AnswerIndex);
            $("#hdnLevel2QuestionIndex").val(Level2QuestionIndex);
            $("#addMultilevelOption2").modal('show');
        }
        else if (className == "remove_multilevel_field_2") {
            $(this).parent().parent().remove();
        }
    });
});
