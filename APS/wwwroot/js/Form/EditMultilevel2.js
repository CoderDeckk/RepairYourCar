
var Level1AnswerIndex = "";
var Level2QuestionIndex = "";
var selectedAnswerId2 = "";

function GetSetJsonMultilevelInputType2(type, caption, fieldsequence, id, selectedAnswerId1, fromInspection, currentSelectedVal = null, option = null) {
    debugger;
    var inputTypeData = new GetInputType(type, caption, option, id);
    var isEmptyObject = $.isEmptyObject(multiLevelObject2);

    if (fromInspection) {
        if (currentSelectedVal == "P") {
            PInspectionInputTypeArray.push(inputTypeData);
        }
        else if (currentSelectedVal == "F") {
            FInspectionInputTypeArray.push(inputTypeData);
        }
    }
    else {
        if (!isEmptyObject) {
            var index = multiLevelObject2.Answers.findIndex(m => m.Id == selectedAnswerId2);
            if (index > -1) {
                multiLevelObject2.Answers[index].MultiLevelInputTypeArray.push(inputTypeData);
            }
        }
        else {
            var listofindexes = GetGeneralIndex2();
            Level1AnswerIndex = listofindexes.Level1AnswerIndex; Level2QuestionIndex = listofindexes.Level2QuestionIndex;
            parentIndex = listofindexes.parentIndex; sectionIndex = listofindexes.sectionIndex;

            var IsLevel1ObjectEmpty = $.isEmptyObject(multiLevelObject1);
            if (!IsLevel1ObjectEmpty) {
                objectArray = multiLevelObject1.Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers;
            }
            else if (sectionIndex < 0 || sectionIndex == undefined) {
                objectArray = parentMultiLevelArray[parentIndex].Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers;
            }
            else {
                objectArray = formdata.FormSections[sectionIndex].FormSectionMultilevelField[parentIndex].Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers;
            }

            index = objectArray.findIndex(m => m.Id == selectedAnswerId1);
            if (index > -1) {
                objectArray[index].MultiLevelInputTypeArray.push(inputTypeData);
            }
        }
    }
}

function EditInspectionControlFields2(isObjectEmpty, oldControlId, currentSelectedVal, controlCaption, controlOption) {
    debugger;

    var listofindexes = GetIndexes2(isObjectEmpty, oldControlId, true, currentSelectedVal);
    Level1AnswerIndex = listofindexes.Level1AnswerIndex; Level2QuestionIndex = listofindexes.Level2QuestionIndex;
    index = listofindexes.index; controlIndex = listofindexes.controlIndex; parentIndex = listofindexes.parentIndex;
    InspectionIndex = listofindexes.InspectionIndex; InspectionFieldIndex = listofindexes.InspectionFieldIndex;
    currentSelectedStatusIndex = listofindexes.currentSelectedStatusIndex;

    if (InspectionIndex > -1) {
        switch (currentSelectedVal) {
            case 'P':
                PInspectionInputTypeArray[InspectionIndex].FieldCaption = controlCaption;
                PInspectionInputTypeArray[InspectionIndex].FieldInputOptions = controlOption;
                break;
            case 'F':
                FInspectionInputTypeArray[InspectionIndex].FieldCaption = controlCaption;
                FInspectionInputTypeArray[InspectionIndex].FieldInputOptions = controlOption;
                break;
            default: break;
        }
    }
    else {
        if (!isObjectEmpty) {
            multiLevelObject2.Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].FormSectionInspectionStatus[currentSelectedStatusIndex].FormSectionInspectionDataArray[InspectionFieldIndex].FieldCaption = controlCaption;
            multiLevelObject2.Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].FormSectionInspectionStatus[currentSelectedStatusIndex].FormSectionInspectionDataArray[InspectionFieldIndex].FieldInputOptions = controlOption;
        }
        else {
            if (parentIndex < 0 || parentIndex == undefined) {
                multiLevelObject1.Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].FormSectionInspectionStatus[currentSelectedStatusIndex].FormSectionInspectionDataArray[InspectionFieldIndex].FieldCaption = controlCaption;
                multiLevelObject1.Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].FormSectionInspectionStatus[currentSelectedStatusIndex].FormSectionInspectionDataArray[InspectionFieldIndex].FieldInputOptions = controlOption;
            }
            else {
                if (sectionIndex < 0 || sectionIndex == undefined) {
                    parentMultiLevelArray[parentIndex].Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].FormSectionInspectionStatus[currentSelectedStatusIndex].FormSectionInspectionDataArray[InspectionFieldIndex].FieldCaption = controlCaption;
                    parentMultiLevelArray[parentIndex].Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].FormSectionInspectionStatus[currentSelectedStatusIndex].FormSectionInspectionDataArray[InspectionFieldIndex].FieldInputOptions = controlOption;
                }
                else {
                    formdata.FormSections[sectionIndex].FormSectionMultilevelField[parentIndex].Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].FormSectionInspectionStatus[currentSelectedStatusIndex].FormSectionInspectionDataArray[InspectionFieldIndex].FieldCaption = controlCaption;
                    formdata.FormSections[sectionIndex].FormSectionMultilevelField[parentIndex].Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].FormSectionInspectionStatus[currentSelectedStatusIndex].FormSectionInspectionDataArray[InspectionFieldIndex].FieldInputOptions = controlOption;
                }
            }
        }
    }
    return true;
}

function GetIndexes2(isObjectEmpty, controlId, fromInspection = false, currentSelectedStatus = null, level = 0) {
    debugger;
    if (!fromInspection) {
        if (!isObjectEmpty) {
            index = multiLevelObject2.Answers.findIndex(m => m.Id == selectedAnswerId2);
            if (index > -1) {
                controlIndex = multiLevelObject2.Answers[index].MultiLevelInputTypeArray.findIndex(m => m.Id == controlId);
                if (controlIndex > -1) {
                    return {
                        index: index,
                        controlIndex: controlIndex
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
                    var Answers = multiLevelObject1.Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers;
                    controlIndex = Answers[index].MultiLevelInputTypeArray.findIndex(m => m.Id == controlId);
                    if (controlIndex > -1) {
                        return {
                            Level1AnswerIndex: Level1AnswerIndex,
                            Level2QuestionIndex: Level2QuestionIndex,
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
                    Level1AnswerIndex = $("#hdnLevel1AnswerIndex").val();
                    Level2QuestionIndex = $("#hdnLevel2QuestionIndex").val();
                    index = parentMultiLevelArray[parentIndex].Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers.findIndex(m => m.Id == selectedAnswerId2);
                    if (index > -1) {
                        controlIndex = parentMultiLevelArray[parentIndex].Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[index].MultiLevelInputTypeArray.findIndex(m => m.Id == controlId);
                        if (controlIndex > -1) {
                            return {
                                Level1AnswerIndex: Level1AnswerIndex,
                                Level2QuestionIndex: Level2QuestionIndex,
                                index: index,
                                controlIndex: controlIndex,
                                parentIndex: parentIndex
                            }
                        }
                    }
                }
                else {
                    var sectionId = $("#OldSectionId").val();
                    sectionIndex = formdata.FormSections.findIndex(m => m.Id == sectionId);
                    if (sectionIndex > -1) {
                        var parentId = $("#hdnParentMultilevelId1").val();
                        parentIndex = formdata.FormSections[sectionIndex].FormSectionMultilevelField.findIndex(m => m.Id == parentId);
                        if (parentIndex > -1) {
                            Level1AnswerIndex = $("#hdnLevel1AnswerIndex").val();
                            Level2QuestionIndex = $("#hdnLevel2QuestionIndex").val();
                            index = formdata.FormSections[sectionIndex].FormSectionMultilevelField[parentIndex].Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers.findIndex(m => m.Id == selectedAnswerId2);
                            if (index > -1) {
                                controlIndex = formdata.FormSections[sectionIndex].FormSectionMultilevelField[parentIndex].Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[index].MultiLevelInputTypeArray.findIndex(m => m.Id == controlId);
                                if (controlIndex > -1) {
                                    return {
                                        Level1AnswerIndex: Level1AnswerIndex,
                                        Level2QuestionIndex: Level2QuestionIndex,
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
                index = multiLevelObject2.Answers.findIndex(m => m.Id == selectedAnswerId2);
                if (index > -1) {
                    controlIndex = multiLevelObject2.Answers[index].MultiLevelInspectionInputTypeArray.findIndex(m => m.Id == InspectionControlId);
                    if (controlIndex > -1) {
                        InspectionFieldIndex = multiLevelObject2.Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].FormSectionInspectionStatus[currentSelectedStatusIndex].FormSectionInspectionDataArray.findIndex(m => m.Id == controlId);
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
                IsLevel1ObjectEmpty = $.isEmptyObject(multiLevelObject1);
                if (!IsLevel1ObjectEmpty) {
                    Level1AnswerIndex = $("#hdnLevel1AnswerIndex").val();
                    Level2QuestionIndex = $("#hdnLevel2QuestionIndex").val();
                    index = multiLevelObject1.Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers.findIndex(m => m.Id == selectedAnswerId2);
                    if (index > -1) {
                        var Answers = multiLevelObject1.Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers;
                        controlIndex = Answers[index].MultiLevelInspectionInputTypeArray.findIndex(m => m.Id == InspectionControlId);
                        if (controlIndex > -1) {
                            InspectionFieldIndex = Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].FormSectionInspectionStatus[currentSelectedStatusIndex].FormSectionInspectionDataArray.findIndex(m => m.Id == controlId);
                            if (InspectionFieldIndex > -1) {
                                return {
                                    Level1AnswerIndex: Level1AnswerIndex,
                                    Level2QuestionIndex: Level2QuestionIndex,
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
                        Level1AnswerIndex = $("#hdnLevel1AnswerIndex").val();
                        Level2QuestionIndex = $("#hdnLevel2QuestionIndex").val();
                        index = parentMultiLevelArray[parentIndex].Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers.findIndex(m => m.Id == selectedAnswerId2);
                        if (index > -1) {
                            controlIndex = parentMultiLevelArray[parentIndex].Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[index].MultiLevelInspectionInputTypeArray.findIndex(m => m.Id == InspectionControlId);
                            if (controlIndex > -1) {
                                InspectionFieldIndex = parentMultiLevelArray[parentIndex].Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].FormSectionInspectionStatus[currentSelectedStatusIndex].FormSectionInspectionDataArray.findIndex(m => m.Id == controlId);
                                if (InspectionFieldIndex > -1) {
                                    return {
                                        Level1AnswerIndex: Level1AnswerIndex,
                                        Level2QuestionIndex: Level2QuestionIndex,
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
                        sectionIndex = formdata.FormSections.findIndex(m => m.Id == sectionId);
                        if (sectionIndex > -1) {
                            var parentId = $("#hdnParentMultilevelId1").val();
                            parentIndex = formdata.FormSections[sectionIndex].FormSectionMultilevelField.findIndex(m => m.Id == parentId);
                            if (parentIndex > -1) {
                                Level1AnswerIndex = $("#hdnLevel1AnswerIndex").val();
                                Level2QuestionIndex = $("#hdnLevel2QuestionIndex").val();
                                index = formdata.FormSections[sectionIndex].FormSectionMultilevelField[parentIndex].Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers.findIndex(m => m.Id == selectedAnswerId2);
                                if (index > -1) {
                                    controlIndex = formdata.FormSections[sectionIndex].FormSectionMultilevelField[parentIndex].Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[index].MultiLevelInspectionInputTypeArray.findIndex(m => m.Id == InspectionControlId);
                                    if (controlIndex > -1) {
                                        InspectionFieldIndex = formdata.FormSections[sectionIndex].FormSectionMultilevelField[parentIndex].Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[index].MultiLevelInspectionInputTypeArray[controlIndex].FormSectionInspectionStatus[currentSelectedStatusIndex].FormSectionInspectionDataArray.findIndex(m => m.Id == controlId);
                                        if (InspectionFieldIndex > -1) {
                                            return {
                                                Level1AnswerIndex: Level1AnswerIndex,
                                                Level2QuestionIndex: Level2QuestionIndex,
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
}

function GetGeneralIndex2() {
    var IsLevel1ObjectEmpty = $.isEmptyObject(multiLevelObject1);
    if (!IsLevel1ObjectEmpty) {
        Level1AnswerIndex = $("#hdnLevel1AnswerIndex").val();
        Level2QuestionIndex = $("#hdnLevel2QuestionIndex").val();
        return {
            Level1AnswerIndex: Level1AnswerIndex,
            Level2QuestionIndex: Level2QuestionIndex
        }
    }
    else {
        var parentId = $("#hdnParentMultilevelId1").val();
        parentIndex = parentMultiLevelArray.findIndex(m => m.Id == parentId);
        if (parentIndex > -1) {
            Level1AnswerIndex = $("#hdnLevel1AnswerIndex").val();
            Level2QuestionIndex = $("#hdnLevel2QuestionIndex").val();
            return {
                Level1AnswerIndex: Level1AnswerIndex,
                Level2QuestionIndex: Level2QuestionIndex,
                parentIndex: parentIndex
            }
        }
        else {
            var sectionId = $("#OldSectionId").val();
            sectionIndex = formdata.FormSections.findIndex(m => m.Id == sectionId);
            if (sectionIndex > -1) {
                var parentId = $("#hdnParentMultilevelId1").val();
                parentIndex = formdata.FormSections[sectionIndex].FormSectionMultilevelField.findIndex(m => m.Id == parentId);
                if (parentIndex > -1) {
                    Level1AnswerIndex = $("#hdnLevel1AnswerIndex").val();
                    Level2QuestionIndex = $("#hdnLevel2QuestionIndex").val();
                    return {
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

function SortingLevel2() {
    debugger;
    var isEmptyObject = $.isEmptyObject(multiLevelObject2);
    var objectArray = [];

    if (!isEmptyObject) {
        objectArray = multiLevelObject2.Answers;
    }
    else {
        var listofindexes = GetGeneralIndex2();
        Level1AnswerIndex = listofindexes.Level1AnswerIndex; Level2QuestionIndex = listofindexes.Level2QuestionIndex;
        parentIndex = listofindexes.parentIndex; sectionIndex = listofindexes.sectionIndex;

        var IsLevel1ObjectEmpty = $.isEmptyObject(multiLevelObject1);
        if (!IsLevel1ObjectEmpty) {
            objectArray = multiLevelObject1.Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers;
        }
        if (sectionIndex < 0 || sectionIndex == undefined) {
            objectArray = parentMultiLevelArray[parentIndex].Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers;
        }
        else {
            objectArray = formdata.FormSections[sectionIndex].FormSectionMultilevelField[parentIndex].Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers;
        }
    }

    var divIds = $.map($(".multilevel_fields_container_2").children("div[id]"), function (e, i) {
        return $(e).attr('id');
    });

    $.each(divIds, function (divIndex) {
        debugger;
        var currentDivId = divIds[divIndex];
        var controlArray = $(".multilevel_fields_container_2 #" + currentDivId).sortable("toArray");


        for (var i = 0; i < controlArray.length; i++) {
            $.each(objectArray, function (answerIndex) {
                debugger;
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

$(document).ready(function () {

    $("#ddlMultilevelAnswer2").on("change", function () {
        debugger;
        //$("#addmultileveltextbox2,#addmultileveldropdownlist2,#addmultilevelcheckbox2,#addmultilevelradiobutton2," +
        //    "#addmultilevelinspectioncontrol2,#addmultilevel2").removeClass("pointernone");
        $(".inputControls_2").removeClass("pointernone");
        selectedAnswerId2 = $("#ddlMultilevelAnswer2").val();
        var contentId = "#Content_" + selectedAnswerId2;
        $('.multilevel_fields_container_2').find('.answerContent').css("display", "none");
        $('.multilevel_fields_container_2').find('' + contentId + '').css("display", "block");
        $('.multilevel_fields_container_2').find('.edit_multilevel_field_3,.remove_multilevel_field_3').css("display", "inline");
        $('.multilevel_fields_container_2 .final_multilevel_container_3').find('.answerContent').css("display", "block");
        $('.multilevel_fields_container_2 .final_multilevel_container_3').find('.multilevel_edit_field,.multilevel_remove_field').css("display", "none");
        $('.multilevel_fields_container_2 .final_multilevel_container_3').find('.multilevel_edit_inspection_field,.multilevel_remove_inspection_field').css("display", "none");
    });

    $("#btnMultilevelAnswer2").click(function () {
        debugger;
        $("#lblMultilevelOptions").text($(this).attr('name'));
        $("#txtNoofMultilevelOption,#txtMultilevelOptionDescription").val("");
        $("#spanChildNodeNumberError,#spanChildNodeNamesError").css("display", "none");

        var questionLevel2 = $("#txtMultilevelQuestion2").val();
        //var Id = questionLevel2.replace(/\s/g, "_") + "_" + FieldCounter;
        var Id = sectionfieldidcreation;
        multiLevelObject2 = {
            Id: Id,
            Question: questionLevel2,
            Answers: [],
            FieldSequence: FieldCounter,
            IsFieldPrivate: null
        }

        sectionfieldidcreation = sectionfieldidcreation - 1;
        //mulitLevelIdCounter = mulitLevelIdCounter + 1;
    });

    $("#SaveMultilevel2").click(function (e) {
        debugger;
        $(".multilevel_fields_container_2 .multilevel_edit_field,.multilevel_fields_container_2 .multilevel_edit_inspection_field," +
            ".multilevel_fields_container_2 .multilevel_remove_field,.multilevel_fields_container_2 .multilevel_remove_inspection_field," +
            ".multilevel_fields_container_2 .edit_multilevel_field_3,.multilevel_fields_container_2 .remove_multilevel_field_3").css("display", "none");

        $('.multilevel_fields_container_2').find('.field_pointeraction').addClass('field_pointer');
        $('.multilevel_fields_container_2').find('.inspection_pointeraction').addClass('inspection_pointer');

        SortingLevel2();

        var htmlpart = $(".multilevel_fields_container_2").html();
        var answersOption = [];
        var Id = "";
        var contentIdLevel1 = "#Content_" + selectedAnswerId1;
        var Question = $("#txtMultilevelQuestion2").val();
        var answersOptiontext = "";
        var isLevel1ObjectEmpty = false;
        var isObjectEmpty = $.isEmptyObject(multiLevelObject2);
        if (!isObjectEmpty) {
            $.each(multiLevelObject2.Answers, function (index) {
                answersOption.push(multiLevelObject2.Answers[index].FieldCaption);
            });
            Id = multiLevelObject2.Id;
            Question = multiLevelObject2.Question;
            answersOptiontext = answersOption.join(',');
            var isEmptyObject = $.isEmptyObject(multiLevelObject1);
            if (!isEmptyObject) {
                index = multiLevelObject1.Answers.findIndex(m => m.Id == selectedAnswerId1);
                if (index > -1) {
                    multiLevelObject1.Answers[index].MultiLevelArray.push(multiLevelObject2);
                }
            }
            else {
                var parentId = $("#hdnParentMultilevelId1").val();
                parentIndex = parentMultiLevelArray.findIndex(m => m.Id == parentId);
                if (parentIndex > -1) {
                    Level1AnswerIndex = parentMultiLevelArray[parentIndex].Answers.findIndex(m => m.Id == selectedAnswerId1);
                    if (Level1AnswerIndex > -1) {
                        parentMultiLevelArray[parentIndex].Answers[Level1AnswerIndex].MultiLevelArray.push(multiLevelObject2);
                    }
                }
                else {
                    var sectionId = $("#OldSectionId").val();
                    sectionIndex = formdata.FormSections.findIndex(m => m.Id == sectionId);
                    if (sectionIndex > -1) {
                        var parentId = $("#hdnParentMultilevelId1").val();
                        parentIndex = formdata.FormSections[sectionIndex].FormSectionMultilevelField.findIndex(m => m.Id == parentId);
                        if (parentIndex > -1) {
                            Level1AnswerIndex = formdata.FormSections[sectionIndex].FormSectionMultilevelField[parentIndex].Answers.findIndex(m => m.Id == selectedAnswerId1);
                            if (Level1AnswerIndex > -1) {
                                formdata.FormSections[sectionIndex].FormSectionMultilevelField[parentIndex].Answers[Level1AnswerIndex].MultiLevelArray.push(multiLevelObject2);
                            }
                        }
                    }
                }
            }
        }
        else {
            isLevel1ObjectEmpty = $.isEmptyObject(multiLevelObject1);
            if (!isLevel1ObjectEmpty) {
                Level1AnswerIndex = $("#hdnLevel1AnswerIndex").val();
                Level2QuestionIndex = $("#hdnLevel2QuestionIndex").val();
                $.each(multiLevelObject1.Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers, function (index) {
                    answersOption.push(multiLevelObject1.Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[index].FieldCaption);
                });
                Id = multiLevelObject1.Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Id;
                Question = multiLevelObject1.Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Question;
                answersOptiontext = answersOption.join(',');
            }
            else {
                var parentId = $("#hdnParentMultilevelId1").val();
                parentIndex = parentMultiLevelArray.findIndex(m => m.Id == parentId);
                if (parentIndex > -1) {
                    Level1AnswerIndex = $("#hdnLevel1AnswerIndex").val();
                    Level2QuestionIndex = $("#hdnLevel2QuestionIndex").val();
                    $.each(parentMultiLevelArray[parentIndex].Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers, function (index) {
                        answersOption.push(parentMultiLevelArray[parentIndex].Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[index].FieldCaption);
                    });
                    Id = parentMultiLevelArray[parentIndex].Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Id;
                    Question = parentMultiLevelArray[parentIndex].Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Question;
                    answersOptiontext = answersOption.join(',');
                }
                else {
                    var sectionId = $("#OldSectionId").val();
                    sectionIndex = formdata.FormSections.findIndex(m => m.Id == sectionId);
                    if (sectionIndex > -1) {
                        var parentId = $("#hdnParentMultilevelId1").val();
                        parentIndex = formdata.FormSections[sectionIndex].FormSectionMultilevelField.findIndex(m => m.Id == parentId);
                        if (parentIndex > -1) {
                            Level1AnswerIndex = $("#hdnLevel1AnswerIndex").val();
                            Level2QuestionIndex = $("#hdnLevel2QuestionIndex").val();
                            $.each(formdata.FormSections[sectionIndex].FormSectionMultilevelField[parentIndex].Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers, function (index) {
                                answersOption.push(formdata.FormSections[sectionIndex].FormSectionMultilevelField[parentIndex].Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[index].FieldCaption);
                            });
                            Id = formdata.FormSections[sectionIndex].FormSectionMultilevelField[parentIndex].Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Id;
                            formdata.FormSections[sectionIndex].FormSectionMultilevelField[parentIndex].Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Question = Question;
                            answersOptiontext = answersOption.join(',');
                        }
                    }
                }
            }

        }

        if (!isObjectEmpty) {
            $('.multilevel_fields_container_1 ' + contentIdLevel1 + '').append("<div id='" + Id + "' style='border:1px solid #ddd; margin-bottom:10px; margin-top:10px;'><div class='col-md-12' style='background:#aaa;padding-top:6px;margin-bottom:8px;'><label>Multilevel Question :</label><label id='lblmultilevelcontrolname'>" + Question + "</label>" +
                "<a href='#' class='edit_multilevel_field_2' style='margin-left:10px;'>Edit</a>" +
                "<a href='#' class='remove_multilevel_field_2' style='margin-left:10px;'>Remove</a></div><div class='col-md-12'>" +
                "<label>Options :  </label><label id='lblAnswerOptions'>" + answersOptiontext + "</label><br/>" +
                "<div class='final_multilevel_container_2'>" + htmlpart + "</div></div></div>");
            multiLevelObject2 = {};
            FieldCounter = FieldCounter + 1;
        }
        else {
            $('.multilevel_fields_container_1 div[Id=' + Id + ']').html("<div class='col-md-12' style='background:#aaa;padding-top:6px;margin-bottom:8px;'><label>Multilevel Question :</label><label id='lblmultilevelcontrolname'>" + Question + "</label>" +
                "<a href='#' class='edit_multilevel_field_2' style='margin-left:10px;'>Edit</a>" +
                "<a href='#' class='remove_multilevel_field_2' style='margin-left:10px;'>Remove</a></div><div class='col-md-12'>" +
                "<label>Options :  </label><label id='lblAnswerOptions'>" + answersOptiontext + "</label><br/>" +
                "<div class='final_multilevel_container_2'>" + htmlpart + "</div></div>")
        }

    });

    //Add New Controls
    $("#addmultileveltextbox2").click(function (e) {
        debugger;
        e.preventDefault();

        if (TextBoxCaptionInput()) {

            //var Id = TextboxCaption.replace(/\s|,/g, "_") + "_" + FieldCounter;
            var Id = sectionfieldidcreation;
            var contentId = "#Content_" + selectedAnswerId2;
            var textboxType = $(this).attr('name');
            var labelClassName = "field_pointeraction";

            renderingDiv = '.multilevel_fields_container_2 ' + contentId;
            fromInspection = false;

            GetSetJsonMultilevelInputType2('TextBox', TextboxCaption, FieldCounter, Id, selectedAnswerId2, fromInspection);
            sectionfieldidcreation = sectionfieldidcreation - 1;

            $(renderingDiv).append('<div class="col-sm-3" id="' + Id + '" style="display:inline-block"><div class="form-group"><label id="lbltextbox">' + TextboxCaption + '</label >' +
                '<input class="form-control"  type="text"/></div>' +
                '<label class="' + labelClassName + '"><input checked class= "multilevel_private_field" type = "checkbox" name="Private Field"> Private Field</label>' +
                '<a href="#" class="multilevel_edit_field" style = "margin-left:10px;"> Edit</a>' +
                '<a href="#" class="multilevel_remove_field" style="margin-left:10px;">Remove</a></div>');
        }
    });

    $("#addmultileveldropdownlist2,#addmultilevelcheckbox2,#addmultilevelradiobutton2").click(function (e) {
        e.preventDefault();
        debugger;
        var controlName = $(this).attr('name');
        if (controlName.indexOf('_') > -1) {
            var controlarray = controlName.split('_');
            controlName = controlarray[1];
            $("#lblHiddenMultilevelInspectionControl2").text(controlarray[0]);
        }
        $("#lblMultilevelControlCaptionId2").text(controlName);
        $("#txtMultilevelControlCaptionId2,#txtMultilevelControlCaptionOption2").val("");
        $("#lblHiddenMultilevelInspectionControl2").text("");
        $("#IsFieldForEdit3").val(false);
        $("#spanControlCaptionIdError2, #spanCaptionOptionError2").css("display", "none");
    });

    $("#AddMultilevelControlOptions2").click(function () {
        debugger;
        $("#spanControlCaptionIdError2, #spanCaptionOptionError2").css("display", "none");
        var controlType = $("#lblMultilevelControlCaptionId2").text();
        var controlCaption = $("#txtMultilevelControlCaptionId2").val();
        var controlOption = $("#txtMultilevelControlCaptionOption2").val();
        controlOption = controlOption.replace(/\n/g, '').trim();

        if ((controlCaption == "" || controlCaption == undefined) && (controlOption == "" || controlOption == undefined)) {
            $("#spanControlCaptionIdError2, #spanCaptionOptionError2").css("display", "block");
            return false;
        }
        else if (controlCaption == "" || controlCaption == undefined) {
            $("#spanControlCaptionIdError2").css("display", "block");
            return false;
        }
        else if (controlOption == "" || controlOption == undefined) {
            $("#spanCaptionOptionError2").css("display", "block");
            return false;
        }

        if (!VerifyUserInput(controlCaption)) {
            return false;
        }
        if (!VerifyUserInput(controlOption)) {
            return false;
        }

        var InspectionControlName = $("#lblHiddenMultilevelInspectionControl2").text();
        var controlOptionArray = controlOption.split(',');
        var contentId = "#Content_" + selectedAnswerId2;

        var IsFieldforEdit = $("#IsFieldForEdit2").val();

        var labelClassName = "field_pointeraction";
        var currentSelectedVal = null;
        if (InspectionControlName == "InspectionControl") {
            currentSelectedVal = $("#ddlmultilevelInspectionStatus").val();
            var dvToRender = GetDivId(currentSelectedVal);
            renderingDiv = ".Multilevel_Inspection_Control_container #" + dvToRender;
            fromInspection = true;
            labelClassName = "inspection_pointeraction";
        }
        else {
            renderingDiv = '.multilevel_fields_container_2 ' + contentId;
            fromInspection = false;
        }

        
        if (IsFieldforEdit == "true") {
            var oldControlId = $("#OldMultilevelControlId2").val();
            var isObjectEmpty = $.isEmptyObject(multiLevelObject2);

            if (InspectionControlName == "InspectionControl") {
                EditInspectionControlFields2(isObjectEmpty, oldControlId, currentSelectedVal, controlCaption, controlOption);
            }
            else {
                var listofindexes = GetIndexes2(isObjectEmpty, oldControlId);
                Level1AnswerIndex = listofindexes.Level1AnswerIndex; Level2QuestionIndex = listofindexes.Level2QuestionIndex;
                index = listofindexes.index; controlIndex = listofindexes.controlIndex; parentIndex = listofindexes.parentIndex;
                sectionIndex = listofindexes.sectionIndex;

                if (!isObjectEmpty) {
                    multiLevelObject2.Answers[index].MultiLevelInputTypeArray[controlIndex].FieldInputType = controlType;
                    multiLevelObject2.Answers[index].MultiLevelInputTypeArray[controlIndex].FieldCaption = controlCaption;
                    multiLevelObject2.Answers[index].MultiLevelInputTypeArray[controlIndex].FieldInputOptions = controlOption;
                }
                else {
                    if (parentIndex < 0 || parentIndex == undefined) {
                        multiLevelObject1.Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[index].MultiLevelInputTypeArray[controlIndex].FieldInputType = controlType;
                        multiLevelObject1.Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[index].MultiLevelInputTypeArray[controlIndex].FieldCaption = controlCaption;
                        multiLevelObject1.Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[index].MultiLevelInputTypeArray[controlIndex].FieldInputOptions = controlOption;
                    }
                    else {
                        if (sectionIndex < 0 || sectionIndex == undefined) {
                            parentMultiLevelArray[parentIndex].Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[index].MultiLevelInputTypeArray[controlIndex].FieldInputType = controlType;
                            parentMultiLevelArray[parentIndex].Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[index].MultiLevelInputTypeArray[controlIndex].FieldCaption = controlCaption;
                            parentMultiLevelArray[parentIndex].Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[index].MultiLevelInputTypeArray[controlIndex].FieldInputOptions = controlOption;
                        }
                        else {
                            formdata.FormSections[sectionIndex].FormSectionMultilevelField[parentIndex].Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[index].MultiLevelInputTypeArray[controlIndex].FieldInputType = controlType;
                            formdata.FormSections[sectionIndex].FormSectionMultilevelField[parentIndex].Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[index].MultiLevelInputTypeArray[controlIndex].FieldCaption = controlCaption;
                            formdata.FormSections[sectionIndex].FormSectionMultilevelField[parentIndex].Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[index].MultiLevelInputTypeArray[controlIndex].FieldInputOptions = controlOption;
                        }
                    }
                }
            }

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
                    $(renderingDiv + " div[id='" + oldControlId + "']").children().first().html(data);
                }
            });
            $("#IsFieldForEdit").val(false);
        }

        else {
            //var Id = controlCaption.replace(/\s/g, "_") + "_" + FieldCounter;
            var Id = sectionfieldidcreation;
            if (controlType == "DropDownList") {
                var container = ('<div class="col-sm-3" id="' + Id + '" style = "display:inline-block"><div class="form-group"><label id="lbldropdownlist">' + controlCaption + '</label>' +
                    '<select class="from-control" style="width:100%">');
                for (var i = 0; i < controlOptionArray.length; i++) {
                    container = container + ("<option>" + controlOptionArray[i] + "</option>");
                }
                container = container + ('</select></div><label class="' + labelClassName + '"><input checked class= "multilevel_private_field" type = "checkbox" name="Private Field"> Private Field</label>' +
                    '<a href = "#" class= "multilevel_edit_field" style = "margin-left:10px;"> Edit</a>' +
                    '<a href = "#" class= "multilevel_remove_field" style = "margin-left:10px;">Remove</a></div>');
            }

            else if (controlType == "CheckBox") {
                var container = ('<div class="col-sm-3" id="' + Id + '"  style="display:inline-block"><div class="form-group"><label id="lblcheckbox">' + controlCaption + '</label><br>');
                for (var i = 0; i < controlOptionArray.length; i++) {
                    container = container + ('<label class="checkbox-inline"><input type="checkbox"/>' + controlOptionArray[i] + '</label>');
                }
                container = container + ('</div><label class="' + labelClassName + '"><input checked class= "multilevel_private_field" type = "checkbox" name="Private Field"> Private Field</label>' +
                    '<a href = "#" class= "multilevel_edit_field" style = "margin-left:10px;"> Edit</a>' +
                    '<a href = "#" class= "multilevel_remove_field" style = "margin-left:10px;">Remove</a></div>');
            }

            else if (controlType == "Radio") {
                var container = ('<div class="col-sm-3" id="' + Id + '"  style="display:inline-block"><div class="form-group"><label id="lblradio">' + controlCaption + '</label><br>');
                for (var i = 0; i < controlOptionArray.length; i++) {
                    container = container + ('<label class="radio-inline"><input type="radio"/>' + controlOptionArray[i] + '</label>');
                }
                container = container + ('</div><label class="' + labelClassName + '"><input checked class= "multilevel_private_field" type = "checkbox" name="Private Field"> Private Field</label>' +
                    '<a href = "#" class= "multilevel_edit_field" style = "margin-left:10px;"> Edit</a>' +
                    '<a href = "#" class= "multilevel_remove_field" style = "margin-left:10px;">Remove</a></div> ');
            }

            GetSetJsonMultilevelInputType2(controlType, controlCaption, FieldCounter, Id, selectedAnswerId2, fromInspection, currentSelectedVal, controlOption);
            sectionfieldidcreation = sectionfieldidcreation - 1;
            $(renderingDiv).append(container);
        }

    });

    //Edit and Removal of Controls
    $(".multilevel_fields_container_2").on("click", ".multilevel_edit_field,.multilevel_remove_field,.multilevel_private_field", function () {
        debugger;
        var controlCaption = "";
        var controlOption = "";
        var controlType = "";

        var ischecked = false;
        var controlId = $(this).parent().attr('id');
        var className = $(this).attr('class');

        if (className == "multilevel_private_field") {
            controlId = $(this).parent().parent().attr('id');
            ischecked = $(this).prop("checked");
        }

        var isObjectEmpty = $.isEmptyObject(multiLevelObject2);
        var listofindexes = GetIndexes2(isObjectEmpty, controlId);
        Level1AnswerIndex = listofindexes.Level1AnswerIndex; Level2QuestionIndex = listofindexes.Level2QuestionIndex;
        index = listofindexes.index; controlIndex = listofindexes.controlIndex; parentIndex = listofindexes.parentIndex;
        sectionIndex = listofindexes.sectionIndex;

        if (!isObjectEmpty) { //Edit in the create mode
            if (className == "multilevel_edit_field") {
                controlType = multiLevelObject2.Answers[index].MultiLevelInputTypeArray[controlIndex].FieldInputType;
                controlCaption = multiLevelObject2.Answers[index].MultiLevelInputTypeArray[controlIndex].FieldCaption;
                controlOption = multiLevelObject2.Answers[index].MultiLevelInputTypeArray[controlIndex].FieldInputOptions;
            }
            else if (className == "multilevel_remove_field") {
                multiLevelObject2.Answers[index].MultiLevelInputTypeArray.splice(controlIndex, 1);
            }
            else if (className == "multilevel_private_field") {
                multiLevelObject2.Answers[index].MultiLevelInputTypeArray[controlIndex].IsFieldPrivate = ischecked;
            }


        }
        else {
            if (parentIndex < 0 || parentIndex == undefined) { //Edit from Level1
                if (className == "multilevel_edit_field") {
                    controlType = multiLevelObject1.Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[index].MultiLevelInputTypeArray[controlIndex].FieldInputType;
                    controlCaption = multiLevelObject1.Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[index].MultiLevelInputTypeArray[controlIndex].FieldCaption;
                    controlOption = multiLevelObject1.Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[index].MultiLevelInputTypeArray[controlIndex].FieldInputOptions;
                }
                else if (className == "multilevel_remove_field") {
                    multiLevelObject1.Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[index].MultiLevelInputTypeArray.splice(controlIndex, 1);
                }
                else if (className == "multilevel_private_field") {
                    multiLevelObject1.Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[index].MultiLevelInputTypeArray[controlIndex].IsFieldPrivate = ischecked;
                }
            }
            else {
                if (sectionIndex < 0 || sectionIndex == undefined) { //Edit from Section
                    if (className == "multilevel_edit_field") {
                        controlType = parentMultiLevelArray[parentIndex].Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[index].MultiLevelInputTypeArray[controlIndex].FieldInputType;
                        controlCaption = parentMultiLevelArray[parentIndex].Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[index].MultiLevelInputTypeArray[controlIndex].FieldCaption;
                        controlOption = parentMultiLevelArray[parentIndex].Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[index].MultiLevelInputTypeArray[controlIndex].FieldInputOptions;
                    }
                    else if (className == "multilevel_remove_field") {
                        parentMultiLevelArray[parentIndex].Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[index].MultiLevelInputTypeArray.splice(controlIndex, 1);
                    }
                }
                else {
                    if (className == "multilevel_edit_field") { // Edit from Main Form Page
                        controlType = formdata.FormSections[sectionIndex].FormSectionMultilevelField[parentIndex].Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[index].MultiLevelInputTypeArray[controlIndex].FieldInputType;
                        controlCaption = formdata.FormSections[sectionIndex].FormSectionMultilevelField[parentIndex].Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[index].MultiLevelInputTypeArray[controlIndex].FieldCaption;
                        controlOption = formdata.FormSections[sectionIndex].FormSectionMultilevelField[parentIndex].Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[index].MultiLevelInputTypeArray[controlIndex].FieldInputOptions;
                    }
                    else if (className == "multilevel_remove_field") {
                        var ParentMultilevelId = formdata.FormSections[sectionIndex].FormSectionMultilevelField[parentIndex].Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[index].MultiLevelInputTypeArray[controlIndex].Id;
                        formdata.FormSections[sectionIndex].FormSectionMultilevelField[parentIndex].Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[index].MultiLevelInputTypeArray.splice(controlIndex, 1);
                        if (ParentMultilevelId > 0) {
                            GetSetJsonAllMultilevelRemove(ParentMultilevelId, sectionIndex);
                        }
                    }
                    else if (className == "multilevel_private_field") {
                        formdata.FormSections[sectionIndex].FormSectionMultilevelField[parentIndex].Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[index].MultiLevelInputTypeArray[controlIndex].IsFieldPrivate = ischecked;
                    }
                }
            }
        }

        if (className == "multilevel_edit_field") {
            if (controlType == 'TextBox') {
                if (TextBoxCaptionInput()) {
                    if (Level2QuestionIndex < 0 || Level2QuestionIndex == undefined) {
                        multiLevelObject2.Answers[index].MultiLevelInputTypeArray[controlIndex].FieldCaption = TextboxCaption;
                    }
                    else if (parentIndex < 0 || parentIndex == undefined) {
                        multiLevelObject1.Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[index].MultiLevelInputTypeArray[controlIndex].FieldCaption = TextboxCaption;
                    }
                    else if (sectionIndex < 0 || sectionIndex == undefined) {
                        parentMultiLevelArray[parentIndex].Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[index].MultiLevelInputTypeArray[controlIndex].FieldCaption = TextboxCaption;
                    }
                    else {
                        formdata.FormSections[sectionIndex].FormSectionMultilevelField[parentIndex].Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[index].MultiLevelInputTypeArray[controlIndex].FieldCaption = TextboxCaption;
                    }

                    $(this).parent().find('#lbltextbox').text(TextboxCaption);
                }
            }
            else {
                $("#lblMultilevelControlCaptionId2").text(controlType);
                $("#txtMultilevelControlCaptionId2").val(controlCaption);
                $("#txtMultilevelControlCaptionOption2").val(controlOption);
                $("#OldMultilevelControlId2").val(controlId);
                $("#IsFieldForEdit2").val(true);
                $("#addMultilevelControlOption2").modal('show');
            }
        }
        else if (className == "multilevel_remove_field") {
            $(this).parent().remove();
        }
        else if (className == "multilevel_private_field") {
            if (ischecked) {
                $(this).attr("checked", "checked");
            }
            else {
                $(this).removeAttr("checked", "checked");
            }
        }

        $("#lblHiddenMultilevelInspectionControl2").text("");
    });

    $(".multilevel_fields_container_2").on("click", ".multilevel_edit_inspection_field,.multilevel_remove_inspection_field", function () {
        debugger;
        var className = $(this).attr('class');
        InspectionControlId = $(this).parent().parent().attr('Id');

        //Edit of Inspection Control at any Level-2
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
            $("#chkMultilevelIsMetaInfo").prop("checked", metainfo);
            $('.Multilevel_Inspection_Control_container #dvPparent,.Multilevel_Inspection_Control_container #dvFparent').removeClass("active");
            $('.Multilevel_Inspection_Control_container').find('.inspection_pointer').removeClass('inspection_pointer');
            $(".Multilevel_Inspection_Control_container #dvP,.Multilevel_Inspection_Control_container #dvF").sortable();
            $("#IsMultilevelInspectionControlForEdit").val(true);
            $("#MultilevelInspectionControlId").val(InspectionControlName);
            $("#hdnInspectionControlLevelId").val("InspectionControlLevel2");
            $("#addMultilevelInspection").modal('show');
        }

        // Removal of InspectionControl at Level-2
        else if (className == "multilevel_remove_inspection_field") {
            var isObjectEmpty = $.isEmptyObject(multiLevelObject2);
            if (!isObjectEmpty) {
                index = multiLevelObject2.Answers.findIndex(m => m.Id == selectedAnswerId2);
                if (index > -1) {
                    InspectionControlIndex = multiLevelObject2.Answers[index].MultiLevelInspectionInputTypeArray.findIndex(m => m.Id == InspectionControlId);
                    if (InspectionControlIndex > -1) {
                        multiLevelObject2.Answers[index].MultiLevelInspectionInputTypeArray.splice(InspectionControlIndex, 1);
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
                            multiLevelObject1.Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[index].MultiLevelInspectionInputTypeArray.splice(controlIndex, 1);
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
                                parentMultiLevelArray[parentIndex].Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[index].MultiLevelInspectionInputTypeArray.splice(controlIndex, 1);
                            }
                        }
                    }
                    else {
                        var sectionId = $("#OldSectionId").val();
                        sectionIndex = formdata.FormSections.findIndex(m => m.Id == sectionId);
                        if (sectionIndex > -1) {
                            var parentId = $("#hdnParentMultilevelId1").val();
                            parentIndex = formdata.FormSections[sectionIndex].FormSectionMultilevelField.findIndex(m => m.Id == parentId);
                            if (parentIndex > -1) {
                                Level1AnswerIndex = $("#hdnLevel1AnswerIndex").val();
                                Level2QuestionIndex = $("#hdnLevel2QuestionIndex").val();
                                index = formdata.FormSections[sectionIndex].FormSectionMultilevelField[parentIndex].Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers.findIndex(m => m.Id == selectedAnswerId2);
                                if (index > -1) {
                                    controlIndex = formdata.FormSections[sectionIndex].FormSectionMultilevelField[parentIndex].Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[index].MultiLevelInspectionInputTypeArray.findIndex(m => m.Id == InspectionControlId);
                                    if (controlIndex > -1) {
                                        formdata.FormSections[sectionIndex].FormSectionMultilevelField[parentIndex].Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[index].MultiLevelInspectionInputTypeArray.splice(controlIndex, 1);
                                    }
                                }
                            }
                        }
                    }
                }
            }

            $(this).parent().parent().remove();
        }
    });

    $(".multilevel_fields_container_2").on("click", ".edit_multilevel_field_3,.remove_multilevel_field_3", function () {
        debugger;
        var questionId = $(this).parent().parent().attr('Id');
        var question = "";
        var options = [];
        var Level1AnswerIndex = "";
        var Level2QuestionIndex = "";
        var Level2AnswerIndex = "";
        var Level3QuestionIndex = "";
        var className = $(this).attr('class');
        var ParentMultilevelId = "";
        var IsObjectEmpty = $.isEmptyObject(multiLevelObject2);

        if (!IsObjectEmpty) {
            Level2AnswerIndex = multiLevelObject2.Answers.findIndex(m => m.Id == selectedAnswerId2);
            if (Level2AnswerIndex > -1) {
                Level3QuestionIndex = multiLevelObject2.Answers[Level2AnswerIndex].MultiLevelArray.findIndex(m => m.Id == questionId);
                if (Level3QuestionIndex > -1) {
                    if (className == "edit_multilevel_field_3") {
                        question = multiLevelObject2.Answers[Level2AnswerIndex].MultiLevelArray[Level3QuestionIndex].Question;
                        $.each(multiLevelObject2.Answers[Level2AnswerIndex].MultiLevelArray[Level3QuestionIndex].Answers, function (index) {
                            debugger;
                            options.push({
                                Text: multiLevelObject2.Answers[Level2AnswerIndex].MultiLevelArray[Level3QuestionIndex].Answers[index].FieldCaption,
                                Value: multiLevelObject2.Answers[Level2AnswerIndex].MultiLevelArray[Level3QuestionIndex].Answers[index].Id
                            });
                        });
                    }
                    else if (className == "remove_multilevel_field_3") {
                        multiLevelObject2.Answers[Level2AnswerIndex].MultiLevelArray.splice(Level3QuestionIndex, 1);
                    }
                }
            }
        }
        else {
            var IsLevel1ObjectEmpty = $.isEmptyObject(multiLevelObject1);
            if (!IsLevel1ObjectEmpty) {
                //Level1AnswerIndex = multiLevelObject1.Answers.findIndex(m => m.Id == selectedAnswerId1);
                Level1AnswerIndex = $("#hdnLevel1AnswerIndex").val();
                Level2QuestionIndex = $("#hdnLevel2QuestionIndex").val();
                if (Level1AnswerIndex > -1 && Level2QuestionIndex > -1) {
                    Level2AnswerIndex = multiLevelObject1.Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers.findIndex(m => m.Id == selectedAnswerId2);
                    if (Level2AnswerIndex > -1) {
                        Level3QuestionIndex = multiLevelObject1.Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[Level2AnswerIndex].MultiLevelArray.findIndex(m => m.Id == questionId);
                        if (Level3QuestionIndex > -1) {
                            if (className == "edit_multilevel_field_3") {
                                question = multiLevelObject1.Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[Level2AnswerIndex].MultiLevelArray[Level3QuestionIndex].Question;
                                $.each(multiLevelObject1.Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[Level2AnswerIndex].MultiLevelArray[Level3QuestionIndex].Answers, function (index) {
                                    debugger;
                                    options.push({
                                        Text: multiLevelObject1.Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[Level2AnswerIndex].MultiLevelArray[Level3QuestionIndex].Answers[index].FieldCaption,
                                        Value: multiLevelObject1.Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[Level2AnswerIndex].MultiLevelArray[Level3QuestionIndex].Answers[index].Id
                                    });
                                });
                            }
                            else if (className == "remove_multilevel_field_3") {
                                multiLevelObject1.Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[Level2AnswerIndex].MultiLevelArray.splice(Level3QuestionIndex, 1);
                            }
                        }
                    }
                }
            }
            else {
                var parentId = $("#hdnParentMultilevelId1").val();
                var parentIndex = parentMultiLevelArray.findIndex(m => m.Id == parentId);
                if (parentIndex > -1) {
                    //Level1AnswerIndex = parentMultiLevelArray[parentIndex].Answers.findIndex(m => m.Id == selectedAnswerId1);
                    Level1AnswerIndex = $("#hdnLevel1AnswerIndex").val();
                    Level2QuestionIndex = $("#hdnLevel2QuestionIndex").val();
                    if (Level1AnswerIndex > -1 && Level2QuestionIndex > -1) {
                        Level2AnswerIndex = parentMultiLevelArray[parentIndex].Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers.findIndex(m => m.Id == selectedAnswerId2);
                        if (Level2AnswerIndex > -1) {
                            Level3QuestionIndex = parentMultiLevelArray[parentIndex].Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[Level2AnswerIndex].MultiLevelArray.findIndex(m => m.Id == questionId);
                            if (Level3QuestionIndex > -1) {
                                if (className == "edit_multilevel_field_3") {
                                    question = parentMultiLevelArray[parentIndex].Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[Level2AnswerIndex].MultiLevelArray[Level3QuestionIndex].Question;
                                    $.each(parentMultiLevelArray[parentIndex].Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[Level2AnswerIndex].MultiLevelArray[Level3QuestionIndex].Answers, function (index) {
                                        debugger;
                                        options.push({
                                            Text: parentMultiLevelArray[parentIndex].Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[Level2AnswerIndex].MultiLevelArray[Level3QuestionIndex].Answers[index].FieldCaption,
                                            Value: parentMultiLevelArray[parentIndex].Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[Level2AnswerIndex].MultiLevelArray[Level3QuestionIndex].Answers[index].Id
                                        });
                                    });
                                }
                                else if (className == "remove_multilevel_field_3") {
                                    parentMultiLevelArray[parentIndex].Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[Level2AnswerIndex].MultiLevelArray.splice(Level3QuestionIndex, 1);
                                }
                            }
                        }
                    }
                }
                else {
                    var sectionId = $("#OldSectionId").val();
                    sectionIndex = formdata.FormSections.findIndex(m => m.Id == sectionId);
                    if (sectionIndex > -1) {
                        var parentId = $("#hdnParentMultilevelId1").val();
                        parentIndex = formdata.FormSections[sectionIndex].FormSectionMultilevelField.findIndex(m => m.Id == parentId);
                        if (parentIndex > -1) {
                            //Level1AnswerIndex = SectionDataArray[sectionIndex].MultiLevelTypeArray[parentIndex].Answers.findIndex(m => m.Id == selectedAnswerId1);
                            Level1AnswerIndex = $("#hdnLevel1AnswerIndex").val();
                            Level2QuestionIndex = $("#hdnLevel2QuestionIndex").val();

                            if (Level1AnswerIndex > -1 && Level2QuestionIndex > -1) {
                                Level2AnswerIndex = formdata.FormSections[sectionIndex].FormSectionMultilevelField[parentIndex].Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers.findIndex(m => m.Id == selectedAnswerId2);
                                if (Level2AnswerIndex > -1) {
                                    Level3QuestionIndex = formdata.FormSections[sectionIndex].FormSectionMultilevelField[parentIndex].Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[Level2AnswerIndex].MultiLevelArray.findIndex(m => m.Id == questionId);
                                    if (Level3QuestionIndex > -1) {
                                        ParentMultilevelId = formdata.FormSections[sectionIndex].FormSectionMultilevelField[parentIndex].Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[Level2AnswerIndex].MultiLevelArray[Level3QuestionIndex].Id;
                                        if (className == "edit_multilevel_field_3") {
                                            question = formdata.FormSections[sectionIndex].FormSectionMultilevelField[parentIndex].Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[Level2AnswerIndex].MultiLevelArray[Level3QuestionIndex].Question;
                                            $.each(formdata.FormSections[sectionIndex].FormSectionMultilevelField[parentIndex].Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[Level2AnswerIndex].MultiLevelArray[Level3QuestionIndex].Answers, function (index) {
                                                debugger;
                                                options.push({
                                                    Text: formdata.FormSections[sectionIndex].FormSectionMultilevelField[parentIndex].Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[Level2AnswerIndex].MultiLevelArray[Level3QuestionIndex].Answers[index].FieldCaption,
                                                    Value: formdata.FormSections[sectionIndex].FormSectionMultilevelField[parentIndex].Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[Level2AnswerIndex].MultiLevelArray[Level3QuestionIndex].Answers[index].Id
                                                });
                                            });
                                        }
                                        else if (className == "remove_multilevel_field_3") {
                                            formdata.FormSections[sectionIndex].FormSectionMultilevelField[parentIndex].Answers[Level1AnswerIndex].MultiLevelArray[Level2QuestionIndex].Answers[Level2AnswerIndex].MultiLevelArray.splice(Level3QuestionIndex, 1);
                                            if (ParentMultilevelId > 0) {
                                                GetSetJsonAllMultilevelRemove(ParentMultilevelId, sectionIndex);
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

        $("#txtMultilevelQuestion3").val(question);
        $("#ddlMultilevelAnswer3").empty().append('<option value="" selected disabled>Select</option>').removeAttr('disabled');

        var htmlpart = $(this).parent().parent().find('.final_multilevel_container_3').html();

        $("#hdnParentMultilevelId3").val(questionId);
        $(".multilevel_fields_container_3").html(htmlpart);

        var divIds = $.map($(".multilevel_fields_container_3").children("div[id]"), function (e, i) {
            return $(e).attr('id');
        });

        $.each(divIds, function (index) {
            $(".multilevel_fields_container_3 #" + divIds[index]).sortable();
        });

        $.each(options, function (index) {
            $("#ddlMultilevelAnswer3").append("<option value=" + options[index].Value + ">" + options[index].Text + "</option>");
            $(".multilevel_fields_container_3 div[id=Content_" + options[index].Value + "]").css("display", "none");
        });
        $(".multilevel_fields_container_3").parent().parent().find('.multilevel_edit_field,.multilevel_edit_inspection_field,.multilevel_remove_field,.multilevel_remove_inspection_field').css("display", "inline");
        $(".multilevel_fields_container_3").parent().parent().find('#dvPparent .multilevel_edit_field,#dvFparent .multilevel_edit_field,#dvPparent .multilevel_remove_field,#dvFparent .multilevel_remove_field').css("display", "none");

        $(".multilevel_fields_container_3").find('.field_pointer').removeClass('field_pointer');

        $("#btnMultilevelAnswer3").attr("disabled",true);
        $(".inputControls_3").addClass("pointernone");
        $("#hdnLevel1AnswerIndex").val(Level1AnswerIndex);
        $("#hdnLevel2QuestionIndex").val(Level2QuestionIndex);
        $("#hdnLevel2AnswerIndex").val(Level2AnswerIndex);
        $("#hdnLevel3QuestionIndex").val(Level3QuestionIndex);
        $("#addMultilevelOption3").modal('show');

    });
});