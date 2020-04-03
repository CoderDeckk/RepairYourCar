var FormDataArray = [];
var SectionDataArray = [];
var InputTypeDataArray = [];
var InspectionControlDataArray = [];
var InspectionInputTypeDataArray = [];
var MultilevelInspectionInputTypeDataArray = [];
var selectedvalue = "";
var TextboxCaption;
var regex = '^[a-zA-Z0-9_\\-,? ]*$';
var isSpellCheckCorrect = true;

var PInspectionInputTypeArray = [];
//var UInspectionInputTypeArray = [];
var FInspectionInputTypeArray = [];
// var RRInspectionInputTypeArray = [];

var ControlOptionArray = [];
var FieldCounter = 1;
var InspectionControlId = "";

var treestructure = "";
var multiLevelObject1;
var parentMultiLevelArray = [];
var mulitLevelIdCounter = 1;
var levelPosition = "";

// Whenever user adds the control to section
function GetInputType(type, caption, fieldsequence, id, option, isFieldPrivate = true, isFieldNA = null,level=0,parentId=-1,parentIndex=-1,fieldIndex=-1) {
    debugger;
    this.Type = type;
    this.Caption = caption;
    this.Option = option;
    this.FieldSequence = fieldsequence;
    this.IsFieldPrivate = isFieldPrivate;
    this.IsFieldNA = isFieldNA;
    this.Id = id;
    this.Level = level;
    this.ParentId = parentId;
    this.ParentIndex = parentIndex;
    this.FieldIndex = fieldIndex;
    //this.InspectionControlArray = InspectionControlDataArray;
}

function GetSetJsonInputType(type, caption, fieldsequence, id, option = null) {
    debugger;
    var inputTypeData = new GetInputType(type, caption, fieldsequence, id, option);
    InputTypeDataArray.push(inputTypeData);
}

// When user submit section to form
function GetSectionData(id, name, InputTypeDataArray, quantitymedian, InspectionInputTypeDataArray, MultilevelTypeArray, fieldsequence) {
    debugger;
    this.Id = id;
    this.Name = name;
    this.QuantityMedian = quantitymedian;
    this.InputTypeArray = InputTypeDataArray;
    this.InspectionControlTypeArray = InspectionInputTypeDataArray;
    this.MultiLevelTypeArray = MultilevelTypeArray;
    this.SequenceNumber = fieldsequence;
}

function GetSetJsonSectionData(id, name, InputTypeDataArray, quantitymedian, InspectionInputTypeDataArray, MultilevelTypeArray, fieldsequence) {
    debugger;
    var SectionData = new GetSectionData(id, name, InputTypeDataArray, quantitymedian, InspectionInputTypeDataArray, MultilevelTypeArray, fieldsequence);
    SectionDataArray.push(SectionData);
}

// When click on main save button on index page
function GetFormData(name, SectionDataArray) {
    this.Name = name;
    this.SectionArray = SectionDataArray;
}

function GetSetJsonFormData(name, SectionDataArray) {
    var FormData = new GetFormData(name, SectionDataArray);
    FormDataArray.push(FormData);
};

//When User click on any controls in Inspection Control Section
function GetSetJsonInspectionInputTypeData(type, caption, fieldCounter, currentSelectedVal, id, option = null) {
    if (currentSelectedVal == "P") {
        var InspectionInputTypeData = new GetInputType(type, caption, fieldCounter, id, option);
        PInspectionInputTypeArray.push(InspectionInputTypeData);
    }
    //else if (currentSelectedVal == "U") {
    //    var InspectionInputTypeData = new GetInputType(type, caption, fieldCounter, option);
    //    UInspectionInputTypeArray.push(InspectionInputTypeData);
    //}
    else if (currentSelectedVal == "F") {
        var InspectionInputTypeData = new GetInputType(type, caption, fieldCounter, id, option);
        FInspectionInputTypeArray.push(InspectionInputTypeData);
    }
    //else if (currentSelectedVal == "RR") {
    //    var InspectionInputTypeData = new GetInputType(type, caption, fieldCounter, id, option);
    //    RRInspectionInputTypeArray.push(InspectionInputTypeData);
    //}

}

function GetInspectionInputTypeData(name, InspectionInputTypeArray, isfieldprivate) {
    this.Name = name;
    this.InspectionInputTypeArray = InspectionInputTypeArray;
    this.IsFieldPrivate = isfieldprivate
}

function GetSetJsonInspectionControlData(name, InspectionInputTypeArray, isfieldprivate) {
    var InspectionControlData = new GetInspectionInputTypeData(name, InspectionInputTypeArray, isfieldprivate);
    InspectionControlDataArray.push(InspectionControlData);
}

//When User Click on Save Button in Inspection Control Section
function GetAllInspectionControls(name, InspectionControlDataArray, codestandard, fieldsequence, id, isMetaInfo) {
    this.Name = name;
    this.InspectionControlArray = InspectionControlDataArray;
    this.CodeStandard = codestandard;
    this.FieldSequence = fieldsequence;
    this.Id = id;
    this.IsMetaInfoRequired = isMetaInfo;
}

function GetSetJsonAllInspectionControls(name, InspectionControlDataArray, codestandard, fieldsequence, id, isMetaInfo,fromMultilevel=false) {
    var allInspectionControls = new GetAllInspectionControls(name, InspectionControlDataArray, codestandard, fieldsequence, id, isMetaInfo);
    if (fromMultilevel) {
        MultilevelInspectionInputTypeDataArray.push(allInspectionControls);
    }
    else {
        InspectionInputTypeDataArray.push(allInspectionControls);
    }
}

//Used for Saving the Form to database
function PostFormControls() {

    var FormName = $('#txtFormName').val();
    var InspectionFrequency = $('#ddlInspectionFrequency :selected').text();
    var InspectionFrequencyValue = $('#ddlInspectionFrequency :selected').val();
    var EquipmentType = $('#ddlEquipmentType :selected').text();
    var EquipmentTypeValue = $('#ddlEquipmentType :selected').val();
    var isModelValid = true;
    var isFormNameValid = true;

    if (FormName == "" || FormName == undefined) { $("#spanFormNameError").css("display", "block"); isModelValid = false; }
    if (EquipmentTypeValue == "" || EquipmentTypeValue == undefined) { $("#spanEquipmentTypeError").css("display", "block");; isModelValid = false; }

    if (InspectionFrequencyValue == "" || InspectionFrequencyValue == undefined) { $("#spanInspectionFrequencyError").css("display", "block");; isModelValid = false; }

    if (!isModelValid) {
        return false;
    }
    if (!VerifyUserInput(FormName)) {
        return false;
    }

    debugger;
    $("#dvSection .remove_field,#dvSection .edit_section_field").css("display", "none");
    $("#dvSection").find('.collapse').removeClass('collapse');
    var FormHtml = $("#dvSection").html();
    if (FormHtml.trim() == "") {
        $.confirm({
            title: "Error",
            content: "Atleast one section to be required to save the form",
            buttons: {
                okay: {
                    omg: 'Ok',
                    btnClass: 'btn-red'
                },
            }
        });
        return false;
    }

    debugger;
    var sectionOrder = $('#dvSection').sortable("toArray");
    for (var i = 0; i < sectionOrder.length; i++) {
        var sectionindex = SectionDataArray.findIndex(m => m.Id == sectionOrder[i]);
        if (sectionindex > -1) {
            SectionDataArray[sectionindex].SequenceNumber = i + 1;
        }
    }

    showLoader();
    $.ajax({
        type: 'Post',
        url: '/Form/ValidateFormName',
        data: { 'formname': FormName, 'inspectionfrequency': InspectionFrequency, 'equipmenttype': EquipmentType },
        success: function (data) {
            if (data) {
                hideLoader();
                $("#spanFormCombination").css("display", "block");
                return false;
            }
            else {
                GetSetJsonFormData(FormName, SectionDataArray);
                $.ajax({
                    type: 'Post',
                    url: '/Form/PostFormData',
                    data: { 'formdata': JSON.stringify(FormDataArray), 'inspectionFrequency': InspectionFrequency, 'equipmentType': EquipmentType, 'formhtml': FormHtml },
                    success: function (data) {
                        var confirmBtnClass = 'btn-green'
                        if (data.result == 'Error')
                            confirmBtnClass = 'btn-red'

                        FormDataArray = [];
                        $.confirm({
                            title: data.result,
                            content: data.message,
                            buttons: {
                                okay: {
                                    omg: 'Ok',
                                    btnClass: confirmBtnClass,
                                    action: function () {
                                        if (data.result == 'Success') {
                                            window.location.href = '/Form/Index'
                                        }
                                    }
                                },
                            }
                        });
                        //toastr.success(data.message);
                        //window.location.href = '/Form/Index';
                        $("#spanFormCombination,#spanEquipmentTypeError").css("display", "none");
                        hideLoader();
                    },
                    error: function (jqXhr, textStatus, errorThrown) {
                        toastr.error(errorThrown.toString());
                        $("#spanFormCombination,#spanEquipmentStandardError").css("display", "none");
                        hideLoader();
                        window.location.href = '/Form/Index';
                    }
                });
            }

        },
        error: function (jqXhr, textStatus, errorThrown) {
            toastr.error(errorThrown.toString());
            hideLoader();
        }
    });
}

function ValidateInput() {
    $.confirm({
        title: "Error",
        content: "Something wrong with your input.",
        buttons: {
            okay: {
                omg: 'Ok',
                btnClass: 'btn-red',
            },
        }
    });
    return false;

}
//Clear all the fields on Section Save.
function ClearControls() {
    $('.input_fields_container').empty();
    $('#sectionid').val("");
    //$('#ddlQuantityMedian').val("1");
    $("#addtextbox, #adddropdownlist, #addcheckbox, #addradiobutton ,#addinspectioncontrol,#addmultilevel").addClass("pointernone");
    $('#QuantityMedianCheckBox').prop("checked", false);
    $("#spanSectionListError").css("display", "none");
    //$("#ddlSectionList").empty().append($('<option></option>').val("").html("--Select--"));
    //if (SectionDataArray.length >= 1) {
    //    $("#ddlSectionList").empty().append($('<option></option>').val("").html("--Select--")).append($('<option></option>').val("Top").html("Top Position"));
    //    $.each(SectionDataArray, function () {
    //        $("#ddlSectionList").append($('<option></option>').val(this.Name).html(this.Name));
    //    });

    //}
}

//Clear all the respective arrays and fields on Inspection Control Save
function ClearInspectionControls() {
    debugger;
    InspectionControlDataArray = [];
    PInspectionInputTypeArray = [];
    //UInspectionInputTypeArray = [];
    FInspectionInputTypeArray = [];
    //RRInspectionInputTypeArray = [];
    $('.Inspection_Control_container #dvPparent,' +
        '.Inspection_Control_container #dvFparent').removeClass().addClass("inspectioncontent");
    $(".Inspection_Control_container #dvP, .Inspection_Control_container #dvF").empty();
}

//Takes Input for TextBox Caption
function TextBoxCaptionInput() {
    //debugger;
    var person = prompt("Please enter label:", "");
    if (person == null || person == "") {
        TextboxCaption = "";
        return false;
    }
    else {
        TextboxCaption = person;
        TextboxCaption = TextboxCaption.replace(/\n/g, '').trim();
        if (VerifyUserInput(TextboxCaption)) {
            return true;
        }
        return false;
    }
}

function VerifyUserInput(userInput) {

    if (userInput.match(regex) == null && (userInput != "" || userInput != undefined)) {
        $.confirm({
            title: "Warning",
            content: "No specical characters allowed, only alphnumeric words allowed.",
            buttons: {
                okay: {
                    omg: 'Ok',
                    btnClass: 'btn-red',
                    action: function () {
                        isSpellCheckCorrect = false;
                        //return false;
                    }
                },
            }
        });
    }
    else {
        isSpellCheckCorrect = true;
        return true;
    }
    return false;
}

//Used for returning Id of a div
function GetDivId(currentCtrlName) {
    if (currentCtrlName == "P") return "dvP";
    //else if (currentCtrlName == "U") return "dvU";
    else if (currentCtrlName == "F") return "dvF";
    //else if (currentCtrlName == "RR") return "dvRR";
}


$(document).ready(function () {

    $(".form-control").focusout(function () {

        var value = $(this).val();
        if (value != null && value != undefined) {
            value = value.trim();
            if (value.match(regex) == null && value != "") {
                $.confirm({
                    title: "Warning",
                    content: "No specical characters allowed, only alphnumeric words allowed.",
                    buttons: {
                        okay: {
                            omg: 'Ok',
                            btnClass: 'btn-red',
                            action: function () {
                                isSpellCheckCorrect = false;
                                //return false;
                            }
                        },
                    }
                });
            }
            else {
                isSpellCheckCorrect = true;
            }
        }
        else {
            isSpellCheckCorrect = true;
        }
    });

    $("#txtFormName")
        .focusout(function () {
            $("#spanFormCombination,#spanEquipmentStandardError").css("display", "none");
        })
        .blur(function () {
            $("#spanFormCombination,#spanEquipmentStandardError").css("display", "none");
        })
        //Enable add section button and hide errors when Form Name is entered
        .keyup(function () {
            if ($(this).val() != '') {
                $("#spanFormCombination,#spanEquipmentStandardError").css("display", "none");
                $("#btnaddsection").removeAttr('disabled');
                $("#spanFormNameError").css("display", "none");
            }
            else {
                $("#spanFormCombination,#spanEquipmentStandardError").css("display", "none");
                $("#btnaddsection").attr('disabled', 'true');
                $("#spanFormNameError").css("display", "block");
            }
        });

    //Enable the Section Controls and hide the errors when Section Name is entered
    $("#sectionid").keyup(function () {
        if ($(this).val() != '') {
            $("#addtextbox, #adddropdownlist, #addcheckbox, #addradiobutton , #addinspectioncontrol,#addmultilevel").removeClass("pointernone");
            $("#dvSectionIdError").css("display", "none");
        }
        else {
            $("#addtextbox, #adddropdownlist, #addcheckbox, #addradiobutton , #addinspectioncontrol,#addmultilevel").addClass("pointernone");
            $("#dvSectionIdError").css("display", "block");
        }
    });

    //Hide the Error when Inspection Control Name is entered.
    $("#InspectionControlId").keyup(function () {
        $("#spanInspectionControlIdError").css("display", "none");
    })

    $("#dvSection, #sortable,.Inspection_Control_container #dvP,.Inspection_Control_container #dvF").sortable({ scroll: true, scrollSensitivity: 100, scrollSpeed: 70, tolerance: "pointer", cursor: "move" });

    $('#ddlCodeStandards,#ddlmultilevelInspectionCodeStandards').multiselect({
        maxHeight: 200,
        includeSelectAllOption: true
    });

    $('#addtextbox').click(function (e) {
        debugger;
        e.preventDefault();
        //TextBoxCaptionInput();
        if (TextBoxCaptionInput()) {
            $("#spanInputFieldError").css("display", "none");
            var sectionnameforid = $('#sectionid').val();
            var Id = TextboxCaption.replace(/\s|,/g, "_") + "_" + FieldCounter;
            GetSetJsonInputType('TextBox', TextboxCaption, FieldCounter, Id);
            FieldCounter = FieldCounter + 1;
            $('.input_fields_container').append('<div class="col-sm-3" id="' + Id + '" style="display:inline-block"><div class="form-group"><label id="lbltextbox">' + TextboxCaption + '</label >' +
                '<input class="form-control"  type="text" name="' + sectionnameforid + "_" + TextboxCaption + '"/>' +
                '<label class="field_pointeraction"><input checked class= "check_private" type = "checkbox" name="Private Field"> Private Field</label>' +
                '<a href="#" class="edit_field" style = "margin-left:10px;"> Edit</a>' +
                '<a href="#" class="remove_field" style="margin-left:10px;">Remove</a></div></div>'); //add input field
        }
    });

    $('#adddropdownlist').click(function (e) {
        e.preventDefault();
        $("#lblControlCaptionId").text("DropDownList");
        $("#ControlCaptionId").val("");
        $("#txtCaptionOption").val("");
        $("#IsSectionFieldForEdit").val(false);
        ControlOptionArray = [];
        $("#spanInputFieldError, #spanControlCaptionIdError,#spanCaptionOptionError").css("display", "none");
    });

    $('#addcheckbox').click(function (e) {
        e.preventDefault();
        $("#lblControlCaptionId").text("CheckBox");
        $("#ControlCaptionId").val("");
        $("#txtCaptionOption").val("");
        $("#IsSectionFieldForEdit").val(false);
        ControlOptionArray = [];
        $("#spanInputFieldError, #spanControlCaptionIdError,#spanCaptionOptionError").css("display", "none");
    });

    $('#addradiobutton').click(function (e) {
        e.preventDefault();
        $("#lblControlCaptionId").text("Radio");
        $("#ControlCaptionId").val("");
        $("#txtCaptionOption").val("");
        $("#IsSectionFieldForEdit").val(false);
        ControlOptionArray = [];
        $("#spanInputFieldError, #spanControlCaptionIdError,#spanCaptionOptionError").css("display", "none");
    });

    $('#addinspectioncontrol').click(function () {
        debugger;
        $(".Inspection_Control_container #dvP, .Inspection_Control_container #dvF").empty();
        $("#ddlInspectionStatus").val("Select");
        $("#InspectionControlId").val("");
        PInspectionInputTypeArray = [];
        //UInspectionInputTypeArray = [];
        FInspectionInputTypeArray = [];
        //RRInspectionInputTypeArray = [];
        $('.Inspection_Control_container #dvPparent,.Inspection_Control_container #dvFparent').removeClass("active");
        $("#addinspectiontextbox, #addinspectiondropdownlist, #addinspectioncheckbox, #addinspectionradiobutton").addClass("pointernone");
        $("#spanInspectionControlIdError, #spanInspectionControlStatusError, #spanInputFieldError").css("display", "none");
        $("#ddlCodeStandards").multiselect('deselectAll', false);
        $('#ddlCodeStandards').multiselect('updateButtonText');
        $(".Inspection_Control_container #dvP, .Inspection_Control_container #dvF").sortable({ scroll: true, scrollSensitivity: 100, scrollSpeed: 70, tolerance: "pointer", cursor: "move" });
        $("#chkIsMetaInfo").prop("checked", false);
        $('.Inspection_Control_container #lblPAllPrivateField,.Inspection_Control_container #lblFAllPrivateField').css("display", "inline");
        $('.Inspection_Control_container #chkPAllPrivateField,.Inspection_Control_container #chkFAllPrivateField').prop("checked", false);
    });

    $('.input_fields_container').on("click", ".remove_field", function (e) {
        e.preventDefault();
        $(this).parent().parent('div').remove();

        var labelname = $(this).parent('div').children('label').first().text();
        var index = InputTypeDataArray.findIndex(m => m.Caption == labelname);
        if (index > -1) {
            InputTypeDataArray.splice(index, 1);
        }
        else {
            var oldsectionname = $("#OldSectionName").val();
            var sectionindex = SectionDataArray.findIndex(m => m.Name == oldsectionname);
            if (sectionindex > -1) {
                var inputindex = SectionDataArray[sectionindex].InputTypeArray.findIndex(m => m.Caption == labelname);
                if (inputindex > -1) {
                    SectionDataArray[sectionindex].InputTypeArray.splice(inputindex, 1);

                }

            }

        }
    });

    $('.input_fields_container').on("click", ".remove_inspection_field", function (e) {
        e.preventDefault();
        $(this).parent('div').parent('div').remove();
        var labelname = $(this).parent('div').children('#lblinspectioncontrolname').text();
        var index = InspectionInputTypeDataArray.findIndex(m => m.Name == labelname);
        if (index > -1) {
            InspectionInputTypeDataArray.splice(index, 1);
        }
        else {
            var oldsectionname = $("#OldSectionName").val();
            var sectionindex = SectionDataArray.findIndex(m => m.Name == oldsectionname);
            if (sectionindex > -1) {
                var inspectionindex = SectionDataArray[sectionindex].InspectionControlTypeArray.findIndex(m => m.Name == labelname);
                if (inspectionindex > -1) {
                    SectionDataArray[sectionindex].InspectionControlTypeArray.splice(inspectionindex, 1);

                }
            }
        }
    });

    $('.input_fields_container').on("change", ".check_private", function (e) {
        debugger;
        e.preventDefault();
        if ($(this).prop("checked") == true) {
            //  var labelname = $(this).parent('div').children('label').first().text();
            var labelname = $(this).parent().parent('div').children('label').first().text();
            var index = InputTypeDataArray.findIndex(m => m.Caption == labelname);
            if (index > -1)
                InputTypeDataArray[index].IsFieldPrivate = true;
            else {
                var oldsectionname = $("#OldSectionName").val();
                var sectionindex = SectionDataArray.findIndex(m => m.Name == oldsectionname);
                if (sectionindex > -1) {
                    var inputindex = SectionDataArray[sectionindex].InputTypeArray.findIndex(m => m.Caption == labelname);
                    if (inputindex > -1) {
                        SectionDataArray[sectionindex].InputTypeArray[inputindex].IsFieldPrivate = true;
                    }
                }
            }
            $(this).attr("checked", "checked");
        }
        else if ($(this).prop("checked") == false) {
            var labelname = $(this).parent().parent('div').children('label').first().text();
            var index = InputTypeDataArray.findIndex(m => m.Caption == labelname);
            if (index > -1)
                InputTypeDataArray[index].IsFieldPrivate = false;
            else {
                var oldsectionname = $("#OldSectionName").val();
                var sectionindex = SectionDataArray.findIndex(m => m.Name == oldsectionname);
                if (sectionindex > -1) {
                    var inputindex = SectionDataArray[sectionindex].InputTypeArray.findIndex(m => m.Caption == labelname);
                    if (inputindex > -1) {
                        SectionDataArray[sectionindex].InputTypeArray[inputindex].IsFieldPrivate = false;
                    }
                }
            }
            $(this).removeAttr("checked", "checked");
        }
    });

    $('#addinspectiontextbox').click(function (e) {
        debugger;
        e.preventDefault();

        if (TextBoxCaptionInput()) {
            var sectionnameforid = $('#sectionid').val();
            var currentSelectedVal = $("#ddlInspectionStatus").val();
            var dvToRender = GetDivId(currentSelectedVal);
            var Id = TextboxCaption.replace(/\s|,/g, "_") + "_" + FieldCounter;
            GetSetJsonInspectionInputTypeData('TextBox', TextboxCaption, FieldCounter, currentSelectedVal, Id);
            FieldCounter = FieldCounter + 1;
            //'<label><input class= "check_NA" type = "checkbox" name="NA Field"> NA</label>' +
            $(".Inspection_Control_container #" + dvToRender).append('<div class="col-sm-3" id="' + Id + '" style="display:inline-block;">' +
                '<div class="form-group"><label id="lbltextbox">' + TextboxCaption + '</label >' +
                '<input class="form-control" type="text" name="' + sectionnameforid + "_" + TextboxCaption + '"/>' +
                '<label class="inspection_pointeraction"><input checked class= "check_private" type = "checkbox" name="Private Field"> Private Field</label>' +
                '<a href = "#" class= "edit_inspection_field_controls" style = "margin-left:10px;">Edit</a>' +
                '<a href="#" class="remove_inspection_field_controls" style="margin-left:10px;">Remove</a></div></div>'); //add input field
        }
    });

    $('#addinspectiondropdownlist').click(function (e) { //click event on add more fields button having class add_more_button
        e.preventDefault();
        $("#lblControlCaptionId").text("DropDownList");
        $("#ControlCaptionId, #txtCaptionOption").val("");
        $("#lblHiddenInspectionControl").text("InspectionControl");
        ControlOptionArray = [];
        $("#spanControlCaptionIdError, #spanCaptionOptionError").css("display", "none");
    });

    $('#addinspectioncheckbox').click(function (e) { //click event on add more fields button having class add_more_button
        e.preventDefault();
        $("#lblControlCaptionId").text("CheckBox");
        $("#ControlCaptionId, #txtCaptionOption").val("");
        $("#lblHiddenInspectionControl").text("InspectionControl");
        ControlOptionArray = [];
        $("#spanControlCaptionIdError, #spanCaptionOptionError").css("display", "none");
    });

    $('#addinspectionradiobutton').click(function (e) { //click event on add more fields button having class add_more_button
        e.preventDefault();
        $("#lblControlCaptionId").text("Radio");
        $("#ControlCaptionId, #txtCaptionOption").val("");
        $("#lblHiddenInspectionControl").text("InspectionControl");
        ControlOptionArray = [];
        $("#spanControlCaptionIdError, #spanCaptionOptionError").css("display", "none");
    });

    //Activate or Deactivate different div in Inspection Control
    $("#ddlInspectionStatus").on("change", function (e) {
        e.preventDefault();
        selectedvalue = $("#ddlInspectionStatus").val();
        if (selectedvalue == "P") {
            $('.Inspection_Control_container #dvPparent').addClass("active");
            $('.Inspection_Control_container #dvFparent').removeClass("active");
        }
        else if (selectedvalue == "F") {
            $('.Inspection_Control_container #dvFparent').addClass("active");
            $('.Inspection_Control_container #dvPparent').removeClass("active");
        }
        $("#spanInspectionControlStatusError").css("display", "none");
        $("#addinspectiontextbox, #addinspectiondropdownlist, #addinspectioncheckbox, #addinspectionradiobutton").removeClass("pointernone");
    });

    $('.Inspection_Control_container').on("change", ".check_private", function (e) {
        debugger;
        e.preventDefault();

        var FieldId = $(this).parent().parent().parent().attr('id');
        var selectedvalue = $("#ddlInspectionStatus").val();
        var oldsectionname = $("#OldSectionName").val();

        if ($(this).prop("checked") == true) {
            $(this).attr("checked", "checked");
            switch (selectedvalue) {
                case 'P': var index = PInspectionInputTypeArray.findIndex(m => m.Id == FieldId); //indexOf(labelname);
                    if (index > -1) {
                        PInspectionInputTypeArray[index].IsFieldPrivate = true;
                    }
                    else {
                        var InspectionIndex = InspectionInputTypeDataArray.findIndex(m => m.Id == InspectionControlId);
                        if (InspectionIndex > -1) {
                            var FieldIndex = InspectionInputTypeDataArray[InspectionIndex].InspectionControlArray[0].InspectionInputTypeArray.findIndex(m => m.Id == FieldId);
                            InspectionInputTypeDataArray[InspectionIndex].InspectionControlArray[0].InspectionInputTypeArray[FieldIndex].IsFieldPrivate = true;
                        }
                        else {
                            var sectionindex = SectionDataArray.findIndex(m => m.Name == oldsectionname);
                            if (sectionindex > -1) {
                                var InspectionIndex = SectionDataArray[sectionindex].InspectionControlTypeArray.findIndex(m => m.Id == InspectionControlId);
                                var FieldIndex = SectionDataArray[sectionindex].InspectionControlTypeArray[InspectionIndex].InspectionControlArray[0].InspectionInputTypeArray.findIndex(m => m.Id == FieldId);
                                SectionDataArray[sectionindex].InspectionControlTypeArray[InspectionIndex].InspectionControlArray[0].InspectionInputTypeArray[FieldIndex].IsFieldPrivate = true;
                            }
                        }
                    }

                    break;
                case 'F': var index = FInspectionInputTypeArray.findIndex(m => m.Id == FieldId); //indexOf(labelname);
                    if (index > -1) {
                        FInspectionInputTypeArray[index].IsFieldPrivate = true;
                    }
                    else {
                        var InspectionIndex = InspectionInputTypeDataArray.findIndex(m => m.Id == InspectionControlId);
                        if (InspectionIndex > -1) {
                            var FieldIndex = InspectionInputTypeDataArray[InspectionIndex].InspectionControlArray[1].InspectionInputTypeArray.findIndex(m => m.Id == FieldId);
                            InspectionInputTypeDataArray[InspectionIndex].InspectionControlArray[1].InspectionInputTypeArray[FieldIndex].IsFieldPrivate = true;
                        }
                        else {
                            var sectionindex = SectionDataArray.findIndex(m => m.Name == oldsectionname);
                            if (sectionindex > -1) {
                                var InspectionIndex = SectionDataArray[sectionindex].InspectionControlTypeArray.findIndex(m => m.Id == InspectionControlId);
                                var FieldIndex = SectionDataArray[sectionindex].InspectionControlTypeArray[InspectionIndex].InspectionControlArray[1].InspectionInputTypeArray.findIndex(m => m.Id == FieldId);
                                SectionDataArray[sectionindex].InspectionControlTypeArray[InspectionIndex].InspectionControlArray[1].InspectionInputTypeArray[FieldIndex].IsFieldPrivate = true;
                            }
                        }
                    }
                    break;
                default: break;
            }
        }
        else if ($(this).prop("checked") == false) {
            $(this).removeAttr("checked", "checked");
            switch (selectedvalue) {
                case 'P':
                    $(".Inspection_Control_container #chkPAllPrivateField").removeProp("checked", false).removeAttr("checked");
                    var index = PInspectionInputTypeArray.findIndex(m => m.Id == FieldId); //indexOf(labelname);
                    if (index > -1) {
                        PInspectionInputTypeArray[index].IsFieldPrivate = false;
                    }
                    else {
                        var InspectionIndex = InspectionInputTypeDataArray.findIndex(m => m.Id == InspectionControlId);
                        if (InspectionIndex > -1) {
                            var FieldIndex = InspectionInputTypeDataArray[InspectionIndex].InspectionControlArray[0].InspectionInputTypeArray.findIndex(m => m.Id == FieldId);
                            InspectionInputTypeDataArray[InspectionIndex].InspectionControlArray[0].InspectionInputTypeArray[FieldIndex].IsFieldPrivate = false;
                        }
                        else {
                            var sectionindex = SectionDataArray.findIndex(m => m.Name == oldsectionname);
                            if (sectionindex > -1) {
                                var InspectionIndex = SectionDataArray[sectionindex].InspectionControlTypeArray.findIndex(m => m.Id == InspectionControlId);
                                var FieldIndex = SectionDataArray[sectionindex].InspectionControlTypeArray[InspectionIndex].InspectionControlArray[0].InspectionInputTypeArray.findIndex(m => m.Id == FieldId);
                                SectionDataArray[sectionindex].InspectionControlTypeArray[InspectionIndex].InspectionControlArray[0].InspectionInputTypeArray[FieldIndex].IsFieldPrivate = false;
                            }
                        }
                    }
                    break;
                case 'F':
                    $(".Inspection_Control_container #chkFAllPrivateField").prop("checked", false).removeAttr("checked");
                    var index = FInspectionInputTypeArray.findIndex(m => m.Id == FieldId); //indexOf(labelname);
                    if (index > -1) {
                        FInspectionInputTypeArray[index].IsFieldPrivate = false;
                    }
                    else {
                        var InspectionIndex = InspectionInputTypeDataArray.findIndex(m => m.Id == InspectionControlId);
                        if (InspectionIndex > -1) {
                            var FieldIndex = InspectionInputTypeDataArray[InspectionIndex].InspectionControlArray[1].InspectionInputTypeArray.findIndex(m => m.Id == FieldId);
                            InspectionInputTypeDataArray[InspectionIndex].InspectionControlArray[1].InspectionInputTypeArray[FieldIndex].IsFieldPrivate = false;
                        }
                        else {
                            var sectionindex = SectionDataArray.findIndex(m => m.Name == oldsectionname);
                            if (sectionindex > -1) {
                                var InspectionIndex = SectionDataArray[sectionindex].InspectionControlTypeArray.findIndex(m => m.Id == InspectionControlId);
                                var FieldIndex = SectionDataArray[sectionindex].InspectionControlTypeArray[InspectionIndex].InspectionControlArray[1].InspectionInputTypeArray.findIndex(m => m.Id == FieldId);
                                SectionDataArray[sectionindex].InspectionControlTypeArray[InspectionIndex].InspectionControlArray[1].InspectionInputTypeArray[FieldIndex].IsFieldPrivate = false;
                            }
                        }
                    }
                    break;
                default: break;
            }
        }
    });

    $('.Inspection_Control_container').on("change", ".check_NA", function (e) {
        e.preventDefault();
        debugger;
        var FieldId = $(this).parent().parent().parent().attr('id');
        var selectedvalue = $("#ddlInspectionStatus").val();
        var oldsectionname = $("#OldSectionName").val();

        if ($(this).prop("checked") == true) {
            $(this).attr("checked", "checked");
            switch (selectedvalue) {
                case 'P': var index = PInspectionInputTypeArray.findIndex(m => m.Id == FieldId); //indexOf(labelname);
                    if (index > -1) {
                        PInspectionInputTypeArray[index].IsFieldNA = true;
                    }
                    else {
                        var InspectionIndex = InspectionInputTypeDataArray.findIndex(m => m.Id == InspectionControlId);
                        if (InspectionIndex > -1) {
                            var FieldIndex = InspectionInputTypeDataArray[InspectionIndex].InspectionControlArray[0].InspectionInputTypeArray.findIndex(m => m.Id == FieldId);
                            InspectionInputTypeDataArray[InspectionIndex].InspectionControlArray[0].InspectionInputTypeArray[FieldIndex].IsFieldNA = true;
                        }
                        else {
                            var sectionindex = SectionDataArray.findIndex(m => m.Name == oldsectionname);
                            if (sectionindex > -1) {
                                var InspectionIndex = SectionDataArray[sectionindex].InspectionControlTypeArray.findIndex(m => m.Id == InspectionControlId);
                                var FieldIndex = SectionDataArray[sectionindex].InspectionControlTypeArray[InspectionIndex].InspectionControlArray[0].InspectionInputTypeArray.findIndex(m => m.Id == FieldId);
                                SectionDataArray[sectionindex].InspectionControlTypeArray[InspectionIndex].InspectionControlArray[0].InspectionInputTypeArray[FieldIndex].IsFieldNA = true;
                            }
                        }
                    }
                    break;
                case 'F': var index = FInspectionInputTypeArray.findIndex(m => m.Id == FieldId); //indexOf(labelname);
                    if (index > -1) {
                        FInspectionInputTypeArray[index].IsFieldNA = true;
                    }
                    else {
                        var InspectionIndex = InspectionInputTypeDataArray.findIndex(m => m.Id == InspectionControlId);
                        if (InspectionIndex > -1) {
                            var FieldIndex = InspectionInputTypeDataArray[InspectionIndex].InspectionControlArray[1].InspectionInputTypeArray.findIndex(m => m.Id == FieldId);
                            InspectionInputTypeDataArray[InspectionIndex].InspectionControlArray[1].InspectionInputTypeArray[FieldIndex].IsFieldNA = true;
                        }
                        else {
                            var sectionindex = SectionDataArray.findIndex(m => m.Name == oldsectionname);
                            if (sectionindex > -1) {
                                var InspectionIndex = SectionDataArray[sectionindex].InspectionControlTypeArray.findIndex(m => m.Id == InspectionControlId);
                                var FieldIndex = SectionDataArray[sectionindex].InspectionControlTypeArray[InspectionIndex].InspectionControlArray[1].InspectionInputTypeArray.findIndex(m => m.Id == FieldId);
                                SectionDataArray[sectionindex].InspectionControlTypeArray[InspectionIndex].InspectionControlArray[1].InspectionInputTypeArray[FieldIndex].IsFieldNA = true;
                            }
                        }
                    }
                    break;
                default: break;


            }
        }
        else if ($(this).prop("checked") == false) {
            $(this).removeAttr("checked", "checked");
            switch (selectedvalue) {
                case 'P': var index = PInspectionInputTypeArray.findIndex(m => m.Id == FieldId); //indexOf(labelname);
                    if (index > -1) {
                        PInspectionInputTypeArray[index].IsFieldNA = null;
                    }
                    else {
                        var InspectionIndex = InspectionInputTypeDataArray.findIndex(m => m.Id == InspectionControlId);
                        if (InspectionIndex > -1) {
                            var FieldIndex = InspectionInputTypeDataArray[InspectionIndex].InspectionControlArray[0].InspectionInputTypeArray.findIndex(m => m.Id == FieldId);
                            InspectionInputTypeDataArray[InspectionIndex].InspectionControlArray[0].InspectionInputTypeArray[FieldIndex].IsFieldNA = null;
                        }
                        else {
                            var sectionindex = SectionDataArray.findIndex(m => m.Name == oldsectionname);
                            if (sectionindex > -1) {
                                var InspectionIndex = SectionDataArray[sectionindex].InspectionControlTypeArray.findIndex(m => m.Id == InspectionControlId);
                                var FieldIndex = SectionDataArray[sectionindex].InspectionControlTypeArray[InspectionIndex].InspectionControlArray[0].InspectionInputTypeArray.findIndex(m => m.Id == FieldId);
                                SectionDataArray[sectionindex].InspectionControlTypeArray[InspectionIndex].InspectionControlArray[0].InspectionInputTypeArray[FieldIndex].IsFieldNA = null;
                            }
                        }
                    }

                    break;
                case 'F': var index = FInspectionInputTypeArray.findIndex(m => m.Id == FieldId); //indexOf(labelname);
                    if (index > -1) {
                        FInspectionInputTypeArray[index].IsFieldNA = null;
                    }
                    else {
                        var InspectionIndex = InspectionInputTypeDataArray.findIndex(m => m.Id == InspectionControlId);
                        if (InspectionIndex > -1) {
                            var FieldIndex = InspectionInputTypeDataArray[InspectionIndex].InspectionControlArray[1].InspectionInputTypeArray.findIndex(m => m.Id == FieldId);
                            InspectionInputTypeDataArray[InspectionIndex].InspectionControlArray[1].InspectionInputTypeArray[FieldIndex].IsFieldNA = null;
                        }
                        else {
                            var sectionindex = SectionDataArray.findIndex(m => m.Name == oldsectionname);
                            if (sectionindex > -1) {
                                var InspectionIndex = SectionDataArray[sectionindex].InspectionControlTypeArray.findIndex(m => m.Id == InspectionControlId);
                                var FieldIndex = SectionDataArray[sectionindex].InspectionControlTypeArray[InspectionIndex].InspectionControlArray[1].InspectionInputTypeArray.findIndex(m => m.Id == FieldId);
                                SectionDataArray[sectionindex].InspectionControlTypeArray[InspectionIndex].InspectionControlArray[1].InspectionInputTypeArray[FieldIndex].IsFieldNA = null;
                            }
                        }
                    }
                    break;
                default: break;
            }
        }
    });

    $('.Inspection_Control_container').on("click", ".edit_inspection_field_controls", function (e) {
        debugger;
        var inputtype = "";
        var inputoptions = "";
        var inputcaption = "";
        var oldsectionname = $("#OldSectionName").val();
        var inspectionstatus = $("#ddlInspectionStatus").val();
        var labelname = $(this).parent().children().first().text();
        var FieldId = $(this).parent().parent().attr('id');
        var index = ""
        switch (inspectionstatus) {
            case 'P': index = PInspectionInputTypeArray.findIndex(m => m.Id == FieldId);
                if (index > -1) {
                    inputtype = PInspectionInputTypeArray[index].Type;
                    inputoptions = PInspectionInputTypeArray[index].Option;
                    inputcaption = PInspectionInputTypeArray[index].Caption;
                }
                else {
                    var InspectionIndex = InspectionInputTypeDataArray.findIndex(m => m.Id == InspectionControlId);
                    if (InspectionIndex > -1) {
                        var FieldIndex = InspectionInputTypeDataArray[InspectionIndex].InspectionControlArray[0].InspectionInputTypeArray.findIndex(m => m.Id == FieldId);
                        inputtype = InspectionInputTypeDataArray[InspectionIndex].InspectionControlArray[0].InspectionInputTypeArray[FieldIndex].Type;
                        inputoptions = InspectionInputTypeDataArray[InspectionIndex].InspectionControlArray[0].InspectionInputTypeArray[FieldIndex].Option;
                        inputcaption = InspectionInputTypeDataArray[InspectionIndex].InspectionControlArray[0].InspectionInputTypeArray[FieldIndex].Caption;
                    }
                    else {
                        var sectionindex = SectionDataArray.findIndex(m => m.Name == oldsectionname);
                        if (sectionindex > -1) {
                            var InspectionIndex = SectionDataArray[sectionindex].InspectionControlTypeArray.findIndex(m => m.Id == InspectionControlId);
                            var FieldIndex = SectionDataArray[sectionindex].InspectionControlTypeArray[InspectionIndex].InspectionControlArray[0].InspectionInputTypeArray.findIndex(m => m.Id == FieldId);
                            inputtype = SectionDataArray[sectionindex].InspectionControlTypeArray[InspectionIndex].InspectionControlArray[0].InspectionInputTypeArray[FieldIndex].Type;
                            inputoptions = SectionDataArray[sectionindex].InspectionControlTypeArray[InspectionIndex].InspectionControlArray[0].InspectionInputTypeArray[FieldIndex].Option;
                            inputcaption = SectionDataArray[sectionindex].InspectionControlTypeArray[InspectionIndex].InspectionControlArray[0].InspectionInputTypeArray[FieldIndex].Caption;
                        }
                    }
                }
                break;
            case 'F': index = FInspectionInputTypeArray.findIndex(m => m.Id == FieldId);
                if (index > -1) {
                    inputtype = FInspectionInputTypeArray[index].Type;
                    inputoptions = FInspectionInputTypeArray[index].Option;
                    inputcaption = FInspectionInputTypeArray[index].Caption;
                }
                else {
                    var InspectionIndex = InspectionInputTypeDataArray.findIndex(m => m.Id == InspectionControlId);
                    if (InspectionIndex > -1) {
                        var FieldIndex = InspectionInputTypeDataArray[InspectionIndex].InspectionControlArray[1].InspectionInputTypeArray.findIndex(m => m.Id == FieldId);
                        inputtype = InspectionInputTypeDataArray[InspectionIndex].InspectionControlArray[1].InspectionInputTypeArray[FieldIndex].Type;
                        inputoptions = InspectionInputTypeDataArray[InspectionIndex].InspectionControlArray[1].InspectionInputTypeArray[FieldIndex].Option;
                        inputcaption = InspectionInputTypeDataArray[InspectionIndex].InspectionControlArray[1].InspectionInputTypeArray[FieldIndex].Caption;
                    }
                    else {
                        var sectionindex = SectionDataArray.findIndex(m => m.Name == oldsectionname);
                        if (sectionindex > -1) {
                            var InspectionIndex = SectionDataArray[sectionindex].InspectionControlTypeArray.findIndex(m => m.Id == InspectionControlId);
                            var FieldIndex = SectionDataArray[sectionindex].InspectionControlTypeArray[InspectionIndex].InspectionControlArray[1].InspectionInputTypeArray.findIndex(m => m.Id == FieldId);
                            inputtype = SectionDataArray[sectionindex].InspectionControlTypeArray[InspectionIndex].InspectionControlArray[1].InspectionInputTypeArray[FieldIndex].Type;
                            inputoptions = SectionDataArray[sectionindex].InspectionControlTypeArray[InspectionIndex].InspectionControlArray[1].InspectionInputTypeArray[FieldIndex].Option;
                            inputcaption = SectionDataArray[sectionindex].InspectionControlTypeArray[InspectionIndex].InspectionControlArray[1].InspectionInputTypeArray[FieldIndex].Caption;
                        }
                    }
                }
                break;
            default:
                break;
        }
        if (inputtype.toLowerCase() == "textbox") {
            if (TextBoxCaptionInput()) {
                var dvToRender = GetDivId(inspectionstatus);
                switch (inspectionstatus) {
                    case 'P': index = PInspectionInputTypeArray.findIndex(m => m.Id == FieldId);
                        if (index > -1) {
                            PInspectionInputTypeArray[index].Caption = TextboxCaption;
                        }
                        else {
                            var InspectionIndex = InspectionInputTypeDataArray.findIndex(m => m.Id == InspectionControlId);
                            if (InspectionIndex > -1) {
                                var FieldIndex = InspectionInputTypeDataArray[InspectionIndex].InspectionControlArray[0].InspectionInputTypeArray.findIndex(m => m.Id == FieldId);
                                InspectionInputTypeDataArray[InspectionIndex].InspectionControlArray[0].InspectionInputTypeArray[FieldIndex].Caption = TextboxCaption;
                            }
                            else {
                                var sectionindex = SectionDataArray.findIndex(m => m.Name == oldsectionname);
                                if (sectionindex > -1) {
                                    var InspectionIndex = SectionDataArray[sectionindex].InspectionControlTypeArray.findIndex(m => m.Id == InspectionControlId);
                                    var FieldIndex = SectionDataArray[sectionindex].InspectionControlTypeArray[InspectionIndex].InspectionControlArray[0].InspectionInputTypeArray.findIndex(m => m.Id == FieldId);
                                    SectionDataArray[sectionindex].InspectionControlTypeArray[InspectionIndex].InspectionControlArray[0].InspectionInputTypeArray[FieldIndex].Caption = TextboxCaption;
                                }
                            }
                        }
                        break;
                    case 'F': index = FInspectionInputTypeArray.findIndex(m => m.Id == FieldId);
                        if (index > -1) {
                            FInspectionInputTypeArray[index].Caption = TextboxCaption;
                        }
                        else {
                            var InspectionIndex = InspectionInputTypeDataArray.findIndex(m => m.Id == InspectionControlId);
                            if (InspectionIndex > -1) {
                                var FieldIndex = InspectionInputTypeDataArray[InspectionIndex].InspectionControlArray[1].InspectionInputTypeArray.findIndex(m => m.Id == FieldId);
                                InspectionInputTypeDataArray[InspectionIndex].InspectionControlArray[1].InspectionInputTypeArray[FieldIndex].Caption = TextboxCaption;
                            }
                            else {
                                var sectionindex = SectionDataArray.findIndex(m => m.Name == oldsectionname);
                                if (sectionindex > -1) {
                                    var InspectionIndex = SectionDataArray[sectionindex].InspectionControlTypeArray.findIndex(m => m.Id == InspectionControlId);
                                    var FieldIndex = SectionDataArray[sectionindex].InspectionControlTypeArray[InspectionIndex].InspectionControlArray[1].InspectionInputTypeArray.findIndex(m => m.Id == FieldId);
                                    SectionDataArray[sectionindex].InspectionControlTypeArray[InspectionIndex].InspectionControlArray[1].InspectionInputTypeArray[FieldIndex].Caption = TextboxCaption;
                                }
                            }
                        }
                        break;
                    default:
                        break;
                }
                $('.Inspection_Control_container #' + dvToRender + ' div[Id = ' + FieldId + ']').find('#lbltextbox').text(TextboxCaption);
                return true;
            }
            else return false;

        }
        $("#lblControlCaptionEditId").text(inputtype);
        //$("#ControlCaptionEditId").val(labelname);
        $("#ControlCaptionEditId").val(inputcaption);
        $("#txtCaptionOptionEdit").val(inputoptions);
        $("#OldControlCaptionId").val(FieldId);
        $("#lblHiddenInspectionControlEdit").text("InspectionControl");
        $("#editOption").modal('show');
    });

    $('.Inspection_Control_container').on("click", ".remove_inspection_field_controls", function (e) {
        e.preventDefault();
        $(this).parent().parent('div').remove();
        debugger;
        var selectedvalue = $("#ddlInspectionStatus").val();
        var FieldId = $(this).parent().parent().attr('id');
        var oldsectionname = $("#OldSectionName").val();
        //var labelname = $(this).parent('div').children('label').first().text();
        switch (selectedvalue) {
            case 'P': var index = PInspectionInputTypeArray.findIndex(m => m.Id == FieldId); //indexOf(labelname);
                if (index > -1) {
                    PInspectionInputTypeArray.splice(index, 1);
                }
                else {
                    var InspectionIndex = InspectionInputTypeDataArray.findIndex(m => m.Id == InspectionControlId);
                    if (InspectionIndex > -1) {
                        var FieldIndex = InspectionInputTypeDataArray[InspectionIndex].InspectionControlArray[0].InspectionInputTypeArray.findIndex(m => m.Id == FieldId);
                        InspectionInputTypeDataArray[InspectionIndex].InspectionControlArray[0].InspectionInputTypeArray.splice(FieldIndex, 1);
                    }
                    else {
                        var sectionindex = SectionDataArray.findIndex(m => m.Name == oldsectionname);
                        if (sectionindex > -1) {
                            var InspectionIndex = SectionDataArray[sectionindex].InspectionControlTypeArray.findIndex(m => m.Id == InspectionControlId);
                            var FieldIndex = SectionDataArray[sectionindex].InspectionControlTypeArray[InspectionIndex].InspectionControlArray[0].InspectionInputTypeArray.findIndex(m => m.Id == FieldId);
                            SectionDataArray[sectionindex].InspectionControlTypeArray[InspectionIndex].InspectionControlArray[0].InspectionInputTypeArray.splice(FieldIndex, 1);
                        }
                    }
                }
                break;
            case 'F': var index = FInspectionInputTypeArray.findIndex(m => m.Id == FieldId); //indexOf(labelname);
                if (index > -1) {
                    FInspectionInputTypeArray.splice(index, 1);
                }
                else {
                    var InspectionIndex = InspectionInputTypeDataArray.findIndex(m => m.Id == InspectionControlId);
                    if (InspectionIndex > -1) {
                        var FieldIndex = InspectionInputTypeDataArray[InspectionIndex].InspectionControlArray[1].InspectionInputTypeArray.findIndex(m => m.Id == FieldId);
                        InspectionInputTypeDataArray[InspectionIndex].InspectionControlArray[1].InspectionInputTypeArray.splice(FieldIndex, 1);
                    }
                    else {
                        var sectionindex = SectionDataArray.findIndex(m => m.Name == oldsectionname);
                        if (sectionindex > -1) {
                            var InspectionIndex = SectionDataArray[sectionindex].InspectionControlTypeArray.findIndex(m => m.Id == InspectionControlId);
                            var FieldIndex = SectionDataArray[sectionindex].InspectionControlTypeArray[InspectionIndex].InspectionControlArray[1].InspectionInputTypeArray.findIndex(m => m.Id == FieldId);
                            SectionDataArray[sectionindex].InspectionControlTypeArray[InspectionIndex].InspectionControlArray[1].InspectionInputTypeArray(FieldIndex, 1);
                        }
                    }
                }
                break;
            default: break;
        }
    });

    $(".Inspection_Control_container").on("change", "#chkPAllPrivateField,#chkFAllPrivateField", function (e) {
        debugger;
        var selectedvalue = $("#ddlInspectionStatus").val();
        var oldsectionname = $("#OldSectionName").val();
        switch (selectedvalue) {
            case 'P':
                var isChecked = $(".Inspection_Control_container #chkPAllPrivateField").prop("checked");
                $('.Inspection_Control_container #dvP .check_private').prop("checked", isChecked);
                if (isChecked) {
                    $('.Inspection_Control_container #dvP .check_private').attr("checked", "checked");
                    $(this).attr("checked", "checked");
                }
                else {
                    $('.Inspection_Control_container #dvP .check_private').removeAttr("checked", "checked");
                    $(this).removeAttr("checked", "checked");
                }

                $.each(PInspectionInputTypeArray, function (index) {
                    PInspectionInputTypeArray[index].IsFieldPrivate = isChecked;
                });

                var InspectionIndex = InspectionInputTypeDataArray.findIndex(m => m.Id == InspectionControlId);
                if (InspectionIndex > -1) {
                    $.each(InspectionInputTypeDataArray[InspectionIndex].InspectionControlArray[0].InspectionInputTypeArray, function (index) {
                        InspectionInputTypeDataArray[InspectionIndex].InspectionControlArray[0].InspectionInputTypeArray[index].IsFieldPrivate = isChecked;
                    });
                    InspectionInputTypeDataArray[InspectionIndex].InspectionControlArray[1].IsFieldPrivate = isChecked;
                }

                var sectionindex = SectionDataArray.findIndex(m => m.Name == oldsectionname);
                if (sectionindex > -1) {
                    var InspectionIndex = SectionDataArray[sectionindex].InspectionControlTypeArray.findIndex(m => m.Id == InspectionControlId);
                    $.each(SectionDataArray[sectionindex].InspectionControlTypeArray[InspectionIndex].InspectionControlArray[0].InspectionInputTypeArray, function (index) {
                        SectionDataArray[sectionindex].InspectionControlTypeArray[InspectionIndex].InspectionControlArray[0].InspectionInputTypeArray[index].IsFieldPrivate = isChecked;
                    });
                    SectionDataArray[sectionindex].InspectionControlTypeArray[InspectionIndex].InspectionControlArray[0].IsFieldPrivate = isChecked;
                }
                break;

            case 'F':
                var isChecked = $(".Inspection_Control_container #chkFAllPrivateField").prop("checked");
                $('.Inspection_Control_container #dvF .check_private').prop("checked", isChecked);
                if (isChecked) {
                    $('.Inspection_Control_container #dvF .check_private').attr("checked", "checked");
                    $(this).attr("checked", "checked");
                }
                else {
                    $('.Inspection_Control_container #dvF .check_private').removeAttr("checked", "checked");
                    $(this).removeAttr("checked", "checked");
                }

                $.each(FInspectionInputTypeArray, function (index) {
                    FInspectionInputTypeArray[index].IsFieldPrivate = isChecked;
                });

                var InspectionIndex = InspectionInputTypeDataArray.findIndex(m => m.Id == InspectionControlId);
                if (InspectionIndex > -1) {
                    $.each(InspectionInputTypeDataArray[InspectionIndex].InspectionControlArray[1].InspectionInputTypeArray, function (index) {
                        InspectionInputTypeDataArray[InspectionIndex].InspectionControlArray[1].InspectionInputTypeArray[index].IsFieldPrivate = isChecked;
                    });
                    InspectionInputTypeDataArray[InspectionIndex].InspectionControlArray[1].IsFieldPrivate = isChecked;
                }
                var sectionindex = SectionDataArray.findIndex(m => m.Name == oldsectionname);
                if (sectionindex > -1) {
                    var InspectionIndex = SectionDataArray[sectionindex].InspectionControlTypeArray.findIndex(m => m.Id == InspectionControlId);
                    $.each(SectionDataArray[sectionindex].InspectionControlTypeArray[InspectionIndex].InspectionControlArray[1].InspectionInputTypeArray, function (index) {
                        SectionDataArray[sectionindex].InspectionControlTypeArray[InspectionIndex].InspectionControlArray[1].InspectionInputTypeArray[index].IsFieldPrivate = isChecked;
                    });
                    SectionDataArray[sectionindex].InspectionControlTypeArray[InspectionIndex].InspectionControlArray[1].IsFieldPrivate = isChecked;
                }
                break;
            default: break;
        }
    });

    $("#btnaddsection").attr('disabled', 'true');
    //Hide the error for Section Name when Add Section is clicked
    $("#btnaddsection").click(function (e) {
        e.preventDefault();
        $("#dvSectionIdError, #spanSectionInputError,#spanSectionExistError").css("display", "none");
        $("#IsSectionForEdit").val(false);
        InputTypeDataArray = [];
        InspectionInputTypeDataArray = [];
        parentMultiLevelArray = [];
    });


    //Hide the error for Inspection Frequency DropDownList
    $("#ddlInspectionFrequency").on("change", function (e) {
        e.preventDefault();
        if ($(this).val() != '') {
            $("#spanInspectionFrequencyError").css("display", "none");
        }
        else {
            $("#spanInspectionFrequencyError").css("display", "block");
        }
    });

    //Hide the error for Equipment Type DropDownList
    $("#ddlEquipmentType").on("change", function (e) {
        e.preventDefault();
        if ($(this).val() != '') {
            $("#spanEquipmentTypeError").css("display", "none");
        }
        else {
            $("#spanEquipmentTypeError").css("display", "block");
        }
    });

    //Add the Section controls
    $('#add_section').click(function () {
        //if (!isSpellCheckCorrect) {
        //    ValidateInput();
        //}
        var sectionname = $('#sectionid').val();
        var sectionnnameforid = sectionname.replace(/\s/g, "_");
        var sectionid = sectionnnameforid + "_parent";

        var sectionforedit = $("#IsSectionForEdit").val();
        var oldsectionname = $("#OldSectionName").val();
        var oldsectionnameforid = oldsectionname.replace(/\s/g, "_");

        if (sectionname == "" || sectionname == undefined) {
            $("#dvSectionIdError").css("display", "block");
            return false;
        }
        if ($('.input_fields_container').is(':empty')) {
            $("#spanInputFieldError").css("display", "block");
            return false;
        }

        var IsSectionNameExist = SectionDataArray.findIndex(m => m.Name == sectionname);
        if (IsSectionNameExist > -1) {
            if (oldsectionname == "" || oldsectionname != sectionname) {
                $("#spanSectionExistError").css("display", "block");
                return false;
            }
        }
        else {
            $("#spanSectionExistError").css("display", "none");
        }
        if (!VerifyUserInput(sectionname)) {
            return false;
        }
        var controlOrder = $('#sortable').sortable("toArray");
        for (var i = 0; i < controlOrder.length; i++) {
            var index = InputTypeDataArray.findIndex(m => m.Id == controlOrder[i]);
            var InspectionIndex = InspectionInputTypeDataArray.findIndex(m => m.Id == controlOrder[i]);
            var MultilevelIndex = parentMultiLevelArray.findIndex(m => m.Id == controlOrder[i]);
            if (index > -1) {
                InputTypeDataArray[index].FieldSequence = i + 1;
            }
            else if (InspectionIndex > -1) {
                InspectionInputTypeDataArray[InspectionIndex].FieldSequence = i + 1;
            }
            else if (MultilevelIndex > -1) {
                parentMultiLevelArray[MultilevelIndex].FieldSequence = i + 1;
            }
            else if (sectionforedit == "true") {
                var sectionindex = SectionDataArray.findIndex(m => m.Name == oldsectionname);
                if (sectionindex > -1) {
                    var inputindex = SectionDataArray[sectionindex].InputTypeArray.findIndex(m => m.Id == controlOrder[i]);
                    var InspectionIndex = SectionDataArray[sectionindex].InspectionControlTypeArray.findIndex(m => m.Id == controlOrder[i]);
                    var MultiLevelIndex = SectionDataArray[sectionindex].MultiLevelTypeArray.findIndex(m => m.Id == controlOrder[i]);
                    if (inputindex > -1) {
                        SectionDataArray[sectionindex].InputTypeArray[inputindex].FieldSequence = i + 1;
                    }
                    else if (InspectionIndex > -1) {
                        SectionDataArray[sectionindex].InspectionControlTypeArray[InspectionIndex].FieldSequence = i + 1;
                    }
                    else if (MultilevelIndex > -1) {
                        SectionDataArray[sectionindex].MultiLevelTypeArray[MultilevelIndex].FieldSequence = i + 1;
                    }
                }

            }
        }

        var quantitymedian = $('#QuantityMedianCheckBox').prop("checked");
        var quantitymediandisplaytext = "No";
        if (quantitymedian) {
            quantitymediandisplaytext = "Yes";

        }
        $(".input_fields_container .remove_field,.input_fields_container .edit_field, .input_fields_container .edit_inspection_field , .input_fields_container .remove_inspection_field," +
            ".input_fields_container .edit_multilevel_field_1, .input_fields_container .remove_multilevel_field_1").css("display", "none");

        $('.input_fields_container').find('.field_pointeraction').addClass('field_pointer');
        var htmlpart = $('.input_fields_container').html();
        if (sectionname && $('.input_fields_container:not(:empty)')) {
            if (sectionforedit == "false") {
                GetSetJsonSectionData(sectionid, sectionname, InputTypeDataArray, quantitymedian, InspectionInputTypeDataArray, parentMultiLevelArray, FieldCounter);


                $("#dvSection").append("<div id='" + sectionnnameforid + "_parent' style='clear:both;padding:0' class='col-md-12 panel-group'>" +
                    "<div class='col-md-12 form-header panel panel-default s-accordion--arrow'>" +
                    "<div class='panel-heading'>" +
                    "<a data-toggle='collapse' href='#" + sectionnnameforid + "_fullcontent'>" +
                    " Section Name : <label id='lblsectionname'>" + sectionname + "</label>" +
                    "</a></div>" +
                    "<div class='btn-group'><a href='#' class='edit_section_field text-right'>Edit</a>" +
                    "<a href='#' class='remove_field text-right'>Remove</a></div></div>" +
                    "<div id='" + sectionnnameforid + "_fullcontent' class='col-md-12 panel-collapse collapse show' style='padding: 10px 15px;'>" +
                    "<label style='font-weight:normal'>Quantity Median :</label>" +
                    "<label id='lblquantitymedian' style='font-weight:normal'>" + quantitymediandisplaytext + "</label>" +
                    "<div class='col-md-12 panel-body' id='" + sectionnnameforid + "_htmlcontent'>" + htmlpart + "</div>" +
                    "</div><br></div>");

            }
            else {
                GetSetJsonSectionDataForEdit(oldsectionname, sectionname, quantitymedian, InputTypeDataArray, InspectionInputTypeDataArray, parentMultiLevelArray);
                var sectionparentid = "#" + oldsectionnameforid + "_parent";

                $(sectionparentid).html("<div class='col-md-12 form-header panel panel-default s-accordion--arrow'>" +
                    "<div class='panel-heading' style='display: inline-block;'>" +
                    "<a data-toggle='collapse' href='#" + sectionnnameforid + "_fullcontent'>" +
                    " Section Name : <label id='lblsectionname'>" + sectionname + "</label>" +
                    "</a></div>" +
                    "<div class='pull-right'><a href='#' class='edit_section_field text-right'>Edit</a>" +
                    "<a href='#' class='remove_field text-right'>Remove</a></div></div>" +
                    "<div id='" + sectionnnameforid + "_fullcontent' class='col-md-12 panel-collapse collapse show' style='padding: 10px 15px;'>" +
                    "<label style='font-weight:normal'>Quantity Median :</label>" +
                    "<label id='lblquantitymedian' style='font-weight:normal'>" + quantitymediandisplaytext + "</label>" +
                    "<div class='col-md-12 panel-body' id='" + sectionnnameforid + "_htmlcontent'>" + htmlpart + "</div>" +
                    "</div><br>");

                $("#IsSectionForEdit").val(false);
            }
            InputTypeDataArray = [];
            InspectionInputTypeDataArray = [];
            parentMultiLevelArray = [];
            FieldCounter = FieldCounter + 1;

            ClearControls();
        }
    });

    function GetSetJsonSectionDataForEdit(oldsectionname, sectionname, quantitymedian, InputTypeDataArray, InspectionInputTypeDataArray, parentMultiLevelArray) {
        var sectionindex = SectionDataArray.findIndex(m => m.Name == oldsectionname);
        if (sectionindex > -1) {
            SectionDataArray[sectionindex].Name = sectionname;
            SectionDataArray[sectionindex].quantitymedian = quantitymedian;
            $.each(InputTypeDataArray, function (index) {
                SectionDataArray[sectionindex].InputTypeArray.push(InputTypeDataArray[index]);
            });
            $.each(InspectionInputTypeDataArray, function (index) {
                SectionDataArray[sectionindex].InspectionControlTypeArray.push(InspectionInputTypeDataArray[index]);
            });
            $.each(parentMultiLevelArray, function (index) {
                SectionDataArray[sectionindex].MultiLevelTypeArray.push(parentMultiLevelArray[index]);
            });
        }
    }

    $('#dvSection').on("click", ".edit_section_field", function (e) {
        debugger;
        $("#addsection").modal('show');
        var sectionName = $(this).parent().parent().find('#lblsectionname').text();
        var sectionnameforid = sectionName.replace(/\s/g, "_");

        $("#spanSectionListError").css("display", "none");

        var quantitymedian = $(this).parent().parent().parent().children().find('#lblquantitymedian').text();
        var sectioncontentid = "#" + sectionnameforid + "_htmlcontent";
        var htmlpart = $(this).parent().parent().parent().find(sectioncontentid).html();
        $("#sectionid").val(sectionName);
        if (quantitymedian == "true") {
            $("#QuantityMedianCheckBox").prop("checked", true);
        }
        else {
            $("#QuantityMedianCheckBox").prop("checked", false);
        }

        $('.input_fields_container').html(htmlpart);
        $(".input_fields_container .remove_field, .input_fields_container .edit_inspection_field, .input_fields_container .edit_field,.input_fields_container .remove_inspection_field," +
            ".input_fields_container .edit_multilevel_field_1, .input_fields_container .remove_multilevel_field_1").css("display", "inline");

        $('.input_fields_container').find('.field_pointer').removeClass('field_pointer');

        //Add Pointer to private fields and inspection controls of multilevel control.
        $('.input_fields_container .final_multilevel_container_1,' +
            '.input_fields_container .final_multilevel_container_2,.input_fields_container .final_multilevel_container_3').find('.field_pointeraction').addClass('field_pointer');
        

        $("#IsSectionForEdit").val(true);
        $("#OldSectionName").val(sectionName);

        var sectionid = sectionnameforid + "_parent";
        $("#OldSectionId").val(sectionid);

        $("#addtextbox, #adddropdownlist, #addcheckbox, #addradiobutton ,#addinspectioncontrol,#addmultilevel").removeClass("pointernone");
    });

    $('.input_fields_container').on("click", ".edit_field", function (e) {
        debugger;
        var inputtype = "";
        var inputoptions = "";
        var inputcaption = "";
        var oldsectionname = $("#OldSectionName").val();
        if (oldsectionname == "") {
            oldsectionname = $("#sectionid").val();
        }
        $("#IsSectionFieldForEdit").val(true);
        //var labelname = $(this).parent().children('label').first().text();
        var FieldId = $(this).parent().parent().attr('id');
        var index = InputTypeDataArray.findIndex(m => m.Id == FieldId);
        if (index > -1) {
            inputtype = InputTypeDataArray[index].Type;
            inputoptions = InputTypeDataArray[index].Option;
            inputcaption = InputTypeDataArray[index].Caption;
        }
        else {
            var sectionindex = SectionDataArray.findIndex(m => m.Name == oldsectionname);
            if (sectionindex > -1) {
                var inputindex = SectionDataArray[sectionindex].InputTypeArray.findIndex(m => m.Id == FieldId);
                if (inputindex > -1) {
                    inputtype = SectionDataArray[sectionindex].InputTypeArray[inputindex].Type;
                    inputoptions = SectionDataArray[sectionindex].InputTypeArray[inputindex].Option;
                    inputcaption = SectionDataArray[sectionindex].InputTypeArray[inputindex].Caption;
                }
            }
        }
        if (inputtype.toLowerCase() == "textbox") {
            //TextBoxCaptionInput();
            if (TextBoxCaptionInput()) {
                if (index > -1) {
                    InputTypeDataArray[index].Caption = TextboxCaption;
                }
                else {
                    var sectionindex = SectionDataArray.findIndex(m => m.Name == oldsectionname);
                    if (sectionindex > -1) {
                        var inputindex = SectionDataArray[sectionindex].InputTypeArray.findIndex(m => m.Id == FieldId);
                        if (inputindex > -1) {
                            SectionDataArray[sectionindex].InputTypeArray[inputindex].Caption = TextboxCaption;
                        }
                    }

                }
                //$(".input_fields_container div[id='" + FieldId + "']").find('label:contains(' + labelname + ')').html(TextboxCaption);
                $(".input_fields_container div[id='" + FieldId + "']").find('#lbltextbox').text(TextboxCaption);
                return true;
            }
            else return false;
        }
        $("#lblControlCaptionEditId").text(inputtype);
        $("#ControlCaptionEditId").val(inputcaption);
        $("#txtCaptionOptionEdit").val(inputoptions);
        $("#OldControlCaptionId").val(FieldId);
        $("#editOption").modal('show');
    });


    //Remove the whole Section
    $('#dvSection').on("click", ".remove_field", function (e) {
        e.preventDefault();
        $(this).parent().parent().parent('div').remove();
        var labelname = $(this).parent().parent().find('#lblsectionname').text();
        var index = SectionDataArray.findIndex(m => m.Name == labelname);
        if (index > -1)
            SectionDataArray.splice(index, 1);
    });

    //Add Inspection Control
    $('#AddInspectionControl').click(function () {
        //if (!isSpellCheckCorrect) {
        //    ValidateInput();
        //}
        //$(".Inspection_Control_container #dvP,.Inspection_Control_container #dvF").sortable({ scroll: true, scrollSensitivity: 100, scrollSpeed: 70, tolerance: "pointer", cursor: "move" });
        debugger;
        var oldInspectionName = $("#OldInspectionControlName").val();
        var oldsectionname = $("#OldSectionName").val();
        var IsInspectionControlForEdit = $("#IsInspectionControlForEdit").val();

        var isCheckedAllP = $("#chkPAllPrivateField").prop("checked");
        var isCheckedAllF = $("#chkFAllPrivateField").prop("checked");

        var inspectionName = $('#InspectionControlId').val();
        var inspectionStatus = $('#ddlInspectionStatus').val();
        var codestandard = $("#ddlCodeStandards").val();
        var isMetaInfo = $("#chkIsMetaInfo").prop("checked");
        var isMetaInfoText = "No";
        if (isMetaInfo)
            isMetaInfoText = "Yes";

        if (!VerifyUserInput(inspectionName)) {
            return false;
        }

        var PSortedOrder = $(".Inspection_Control_container #dvP").sortable("toArray");
        for (var i = 0; i < PSortedOrder.length; i++) {
            var PIndex = PInspectionInputTypeArray.findIndex(m => m.Id == PSortedOrder[i]);
            if (PIndex > -1) {
                PInspectionInputTypeArray[PIndex].FieldSequence = i + 1;
            }
            else {
                var InspectionIndex = InspectionInputTypeDataArray.findIndex(m => m.Id == InspectionControlId);
                if (InspectionIndex > -1) {
                    var FieldIndex = InspectionInputTypeDataArray[InspectionIndex].InspectionControlArray[0].InspectionInputTypeArray.findIndex(m => m.Id == PSortedOrder[i]);
                    InspectionInputTypeDataArray[InspectionIndex].InspectionControlArray[0].InspectionInputTypeArray[FieldIndex].FieldSequence = i + 1;
                }
                else {
                    var sectionindex = SectionDataArray.findIndex(m => m.Name == oldsectionname);
                    if (sectionindex > -1) {
                        var InspectionIndex = SectionDataArray[sectionindex].InspectionControlTypeArray.findIndex(m => m.Id == InspectionControlId);
                        var FieldIndex = SectionDataArray[sectionindex].InspectionControlTypeArray[InspectionIndex].InspectionControlArray[0].InspectionInputTypeArray.findIndex(m => m.Id == PSortedOrder[i]);
                        SectionDataArray[sectionindex].InspectionControlTypeArray[InspectionIndex].InspectionControlArray[0].InspectionInputTypeArray[FieldIndex].FieldSequence = i + 1;
                    }
                }
            }
        }
        var FSortedOrder = $(".Inspection_Control_container #dvF").sortable("toArray");
        for (var i = 0; i < FSortedOrder.length; i++) {
            var FIndex = FInspectionInputTypeArray.findIndex(m => m.Id == FSortedOrder[i]);
            if (FIndex > -1) {
                FInspectionInputTypeArray[FIndex].FieldSequence = i + 1;
            }
            else {
                var InspectionIndex = InspectionInputTypeDataArray.findIndex(m => m.Id == InspectionControlId);
                if (InspectionIndex > -1) {
                    var FieldIndex = InspectionInputTypeDataArray[InspectionIndex].InspectionControlArray[1].InspectionInputTypeArray.findIndex(m => m.Id == FSortedOrder[i]);
                    InspectionInputTypeDataArray[InspectionIndex].InspectionControlArray[1].InspectionInputTypeArray[FieldIndex].FieldSequence = i + 1;
                }
                else {
                    var sectionindex = SectionDataArray.findIndex(m => m.Name == oldsectionname);
                    if (sectionindex > -1) {
                        var InspectionIndex = SectionDataArray[sectionindex].InspectionControlTypeArray.findIndex(m => m.Id == InspectionControlId);
                        var FieldIndex = SectionDataArray[sectionindex].InspectionControlTypeArray[InspectionIndex].InspectionControlArray[1].InspectionInputTypeArray.findIndex(m => m.Id == FSortedOrder[i]);
                        SectionDataArray[sectionindex].InspectionControlTypeArray[InspectionIndex].InspectionControlArray[1].InspectionInputTypeArray[FieldIndex].FieldSequence = i + 1;
                    }
                }
            }
        }

        var codestandardtext = $.map($("#ddlCodeStandards option:selected"), function (e, i) {
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

        $('.edit_inspection_field_controls,.remove_inspection_field_controls,#lblPAllPrivateField,#lblFAllPrivateField').css("display", "none");

        if ((inspectionName == "" || inspectionName == undefined) && (inspectionStatus == "Select" || inspectionStatus == undefined)) {
            $("#spanInspectionControlIdError, #spanInspectionControlStatusError").css("display", "inline");
            return false;
        }
        else if (inspectionName == "" || inspectionName == undefined) {
            $("#spanInspectionControlIdError").css("display", "inline");
            return false;
        }
        else if (inspectionStatus == "Select" || inspectionStatus == undefined) {
            $("#spanInspectionControlStatusError").css("display", "inline");
            return false;
        }
        $(".Inspection_Control_container .remove_field").css("display", "none");

        if ($(".Inspection_Control_container #dvP").html().trim() != "") {
            $('.Inspection_Control_container #dvPparent').removeClass().addClass("row");
        }
        else {
            $('.Inspection_Control_container #dvPparent').removeClass("active");
        }

        if ($(".Inspection_Control_container #dvF").html().trim() != "") {
            $('.Inspection_Control_container #dvFparent').removeClass().addClass("row");
        }
        else {
            $('.Inspection_Control_container #dvFparent').removeClass("active");
        }
        $('.Inspection_Control_container').find('.inspection_pointeraction').addClass('inspection_pointer');
        var htmlpart = $('.Inspection_Control_container').html();
        var Inspectionhtmlpart = $('#dvInspectionControlRadio').html();

        if (IsInspectionControlForEdit == "true") {
            var InspectionIndex = InspectionInputTypeDataArray.findIndex(m => m.Id == InspectionControlId);
            if (InspectionIndex > -1) {
                InspectionInputTypeDataArray[InspectionIndex].Name = inspectionName;
                InspectionInputTypeDataArray[InspectionIndex].CodeStandard = codestandard;
                InspectionInputTypeDataArray[InspectionIndex].IsMetaInfoRequired = isMetaInfo;
            }
            else {
                var sectionindex = SectionDataArray.findIndex(m => m.Name == oldsectionname);
                var InspectionIndex1 = SectionDataArray[sectionindex].InspectionControlTypeArray.findIndex(m => m.Id == InspectionControlId);
                if (sectionindex > -1) {
                    SectionDataArray[sectionindex].InspectionControlTypeArray[InspectionIndex1].Name = inspectionName;
                    SectionDataArray[sectionindex].InspectionControlTypeArray[InspectionIndex1].CodeStandard = codestandard;
                    SectionDataArray[sectionindex].InspectionControlTypeArray[InspectionIndex1].IsMetaInfoRequired = isMetaInfo;
                }
            }

            if (PInspectionInputTypeArray.length > 0) {
                if (InspectionInputTypeDataArray.length > 0) {
                    $.each(PInspectionInputTypeArray, function (index) {
                        InspectionInputTypeDataArray[InspectionIndex].InspectionControlArray[0].InspectionInputTypeArray.push(PInspectionInputTypeArray[index]);
                    });
                }
                else {
                    var sectionindex = SectionDataArray.findIndex(m => m.Name == oldsectionname);
                    var InspectionIndex1 = SectionDataArray[sectionindex].InspectionControlTypeArray.findIndex(m => m.Id == InspectionControlId);
                    if (sectionindex > -1) {
                        $.each(PInspectionInputTypeArray, function (index) {
                            SectionDataArray[sectionindex].InspectionControlTypeArray[InspectionIndex1].InspectionControlArray[0].InspectionInputTypeArray.push(PInspectionInputTypeArray[index]);
                        });
                    }
                }
            }
            if (FInspectionInputTypeArray.length > 0) {
                if (InspectionInputTypeDataArray.length > 0) {
                    $.each(FInspectionInputTypeArray, function (index) {
                        InspectionInputTypeDataArray[InspectionIndex].InspectionControlArray[1].InspectionInputTypeArray.push(FInspectionInputTypeArray[index]);
                    });

                }
                else {
                    var sectionindex = SectionDataArray.findIndex(m => m.Name == oldsectionname);
                    var InspectionIndex1 = SectionDataArray[sectionindex].InspectionControlTypeArray.findIndex(m => m.Id == InspectionControlId);
                    if (sectionindex > -1) {
                        $.each(FInspectionInputTypeArray, function (index) {
                            SectionDataArray[sectionindex].InspectionControlTypeArray[InspectionIndex1].InspectionControlArray[1].InspectionInputTypeArray.push(FInspectionInputTypeArray[index]);
                        });
                        //SectionDataArray[sectionindex].InspectionControlTypeArray[InspectionIndex1].Name = inspectionName;
                    }
                }
            }
            $(".input_fields_container #" + InspectionControlId).html("<div class='col-md-12' style='background:#aaa;padding-top:6px;margin-bottom:8px;'><label>Inspection Control Name :</label><label id='lblinspectioncontrolname'>" + inspectionName + "</label>" +
                "<a href='#' class='edit_inspection_field' style='margin-left:10px;'>Edit</a>" +
                "<a href='#' class='remove_inspection_field' style='margin-left:10px;'>Remove</a></div> <div class='col-md-12'>" +
                "<label>Code Standards :  </label><label id='lblCodeStandardsName'>" + codestandardtext +
                "</label><label id='lblCodeStandardsValue' style='display:none'>" + codestandard + "</label><br>" +
                "<label>GP Info :  </label><label id='lblIsMetaInfo'>" + isMetaInfoText + "</label><br>" +
                "<input type='hidden' id='hdnIsMetaInfo' value=" + isMetaInfo + ">" +
                "<input type='hidden' id='hdnisCheckedAllP' value=" + isCheckedAllP + ">" +
                "<input type='hidden' id='hdnisCheckedAllF' value=" + isCheckedAllF + ">" +
                Inspectionhtmlpart + htmlpart + "</div>");
            $("#IsInspectionControlForEdit,#OldInspectionControlName").val("");
            InspectionControlId = "";
        }
        else {

            GetSetJsonInspectionControlData("P", PInspectionInputTypeArray, $("#chkPAllPrivateField").prop("checked"));
            GetSetJsonInspectionControlData("F,RR", FInspectionInputTypeArray, $("#chkFAllPrivateField").prop("checked"));
            var Id = inspectionName.replace(/\s/g, "_") + "_" + FieldCounter;

            GetSetJsonAllInspectionControls(inspectionName, InspectionControlDataArray, codestandard, FieldCounter, Id, isMetaInfo);
            FieldCounter = FieldCounter + 1;
            $('.input_fields_container').append("<div id='" + Id + "' style='border:1px solid #ddd; margin-bottom:10px; margin-top:10px;'><div class='col-md-12' style='background:#aaa;padding-top:6px;margin-bottom:8px;'><label>Inspection Control Name :</label><label id='lblinspectioncontrolname'>" + inspectionName + "</label>" +
                "<a href='#' class='edit_inspection_field' style='margin-left:10px;'>Edit</a>" +
                "<a href='#' class='remove_inspection_field' style='margin-left:10px;'>Remove</a></div><div class='col-md-12'>" +
                "<label>Code Standards :  </label><label id='lblCodeStandardsName'>" + codestandardtext +
                "</label><label id='lblCodeStandardsValue' style='display:none'>" + codestandard + "</label><br>" +
                "<label>GP Info :  </label><label id='lblIsMetaInfo'>" + isMetaInfoText + "</label><br>" +
                "<input type='hidden' id='hdnIsMetaInfo' value=" + isMetaInfo + ">" +
                "<input type='hidden' id='hdnisCheckedAllP' value=" + isCheckedAllP + ">" +
                "<input type='hidden' id='hdnisCheckedAllF' value=" + isCheckedAllF + ">" +
                Inspectionhtmlpart + htmlpart + "</div></div>");
        }
        ClearInspectionControls();
        //$('.Inspection_Control_container #dvPparent, .Inspection_Control_container #dvFparent').removeClass().addClass("inspectioncontent");

    });

    $('.input_fields_container').on("click", ".edit_inspection_field", function (e) {
        debugger;
        InspectionControlId = $(this).parent().parent().attr('Id');
        //var oldsectionname = $("#OldSectionName").val();
        $("#ddlInspectionStatus").val("Select");
        $("#addinspectiontextbox, #addinspectiondropdownlist, #addinspectioncheckbox, #addinspectionradiobutton").addClass("pointernone");
        var InspectionControlName = $(this).parent().parent().find("#lblinspectioncontrolname").text();

        var dvPparent = $(this).parent().parent().find('#dvPparent').html();
        $('.Inspection_Control_container #dvPparent').html(dvPparent).find(".edit_inspection_field_controls,.remove_inspection_field_controls,#lblPAllPrivateField").css("display", "inline");

        var dvFparent = $(this).parent().parent().find('#dvFparent').html();
        $('.Inspection_Control_container #dvFparent').html(dvFparent).find(".edit_inspection_field_controls,.remove_inspection_field_controls,#lblFAllPrivateField").css("display", "inline");

        $("#ddlCodeStandards").multiselect('deselectAll', false);
        $('#ddlCodeStandards').multiselect('updateButtonText');
        var componentsname = $(this).parent().parent().find("#lblCodeStandardsValue").text();
        if (componentsname != "null") {
            var componentarray = componentsname.split(",");
            $.each(componentarray, function (index, value) {
                debugger;
                $("#ddlCodeStandards").multiselect('select', value);
            });
        }

        var metainfo = $(this).parent().parent().find("#hdnIsMetaInfo").val() == "true" ? true : false;
        var isCheckedAllP = $(this).parent().parent().find("#hdnisCheckedAllP").val() == "true" ? true : false;
        var isCheckedAllF = $(this).parent().parent().find("#hdnisCheckedAllF").val() == "true" ? true : false;
        $("#chkIsMetaInfo").prop("checked", metainfo);
        $('.Inspection_Control_container #dvPparent,.Inspection_Control_container #dvFparent').removeClass("active");
        $('.Inspection_Control_container').find('.inspection_pointer').removeClass('inspection_pointer');
        $(".Inspection_Control_container #dvP,.Inspection_Control_container #dvF").sortable({ scroll: true, scrollSensitivity: 100, scrollSpeed: 70, tolerance: "pointer", cursor: "move" });
        $(".Inspection_Control_container #chkPAllPrivateField").prop("checked", isCheckedAllP);
        $(".Inspection_Control_container #chkFAllPrivateField").prop("checked", isCheckedAllF);
        $("#IsInspectionControlForEdit").val(true);
        $("#OldInspectionControlName,#InspectionControlId").val(InspectionControlName);
        $("#addInspection").modal('show');

        //TextBoxCaptionInput();
        //if (TextboxCaption) {
        //    var index = InspectionInputTypeDataArray.findIndex(m => m.Id == id);
        //    if (index > -1) {
        //        InspectionInputTypeDataArray[index].Name = TextboxCaption;

        //    }
        //    else {
        //        var sectionindex = SectionDataArray.findIndex(m => m.Name == oldsectionname);
        //        var InspectionIndex = SectionDataArray[sectionindex].InspectionControlTypeArray.findIndex(m => m.Id == id);
        //        if (InspectionIndex > -1) {
        //            SectionDataArray[sectionindex].InspectionControlTypeArray[InspectionIndex].Name = TextboxCaption;
        //        }
        //    }

        //    $(".input_fields_container #" + id).find("#lblinspectioncontrolname").text(TextboxCaption);

        //}
    });
    //Hide the error when Caption Name is entered for DropDownList,CheckBox and Radio
    $("#ControlCaptionId").keyup(function () {
        $("#spanControlCaptionIdError").css("display", "none");
    });

    $("#txtCaptionOption").keyup(function () {
        $("#spanCaptionOptionError").css("display", "none");
    });

    //Add the DropDownList,CheckBox and Radio
    $('#AddControlOptions').click(function () {
        //if (!isSpellCheckCorrect) {
        //    ValidateInput();
        //}
        var ControlName = $("#lblControlCaptionId").text();
        var ControlCaption = $("#ControlCaptionId").val();
        var ControlOption = $("#txtCaptionOption").val();
        ControlOption = ControlOption.replace(/\n/g, '').trim();

        if ((ControlCaption == "" || ControlCaption == undefined) && (ControlOption == "" || ControlOption == undefined)) {
            $("#spanControlCaptionIdError, #spanCaptionOptionError").css("display", "block");
            return false;
        }
        else if (ControlCaption == "" || ControlCaption == undefined) {
            $("#spanControlCaptionIdError").css("display", "block");
            return false;
        }
        else if (ControlOption == "" || ControlOption == undefined) {
            $("#spanCaptionOptionError").css("display", "block");
            return false;
        }

        if (!VerifyUserInput(ControlCaption)) {
            return false;
        }
        if (!VerifyUserInput(ControlOption)) {
            return false;
        }


        var InspectionControlName = $("#lblHiddenInspectionControl").text();
        ControlOptionArray = ControlOption.split(",");
        var sectionnameforid = $('#sectionid').val();
        if (ControlName == "DropDownList") {

            if (InspectionControlName == "InspectionControl") {
                var Id = ControlCaption.replace(/\s/g, "_") + "_" + FieldCounter;
                var container = ('<div class="col-sm-3" id="' + Id + '" style = "display:inline-block"><div class="form-group" id=' + sectionnameforid + '_' + ControlCaption + '><label id="lbldropdownlist">' + ControlCaption + '</label>' +
                    '<select class="from-control" style="width:100%">');// id =' + sectionnameforid + '_' + ControlCaption + '>' );
                for (var i = 0; i < ControlOptionArray.length; i++) {
                    container = container + ("<option>" + ControlOptionArray[i] + "</option>");
                }
                //'<label><input class= "check_NA" type = "checkbox" name="NA Field">NA</label>' +
                container = container + ('</select><label class="inspection_pointeraction" ><input checked class= "check_private" type = "checkbox" name="Private Field"> Private Field</label>' +
                    '<a href = "#" class= "edit_inspection_field_controls" style = "margin-left:10px;">Edit</a>' +
                    '<a href = "#" class= "remove_inspection_field_controls" style = "margin-left:10px;" > Remove</a ></div></div>');
                var CurrentSelectedVal = $("#ddlInspectionStatus").val();
                var dvToRender = GetDivId(CurrentSelectedVal);
                GetSetJsonInspectionInputTypeData('DropDownList', ControlCaption, FieldCounter, CurrentSelectedVal, Id, ControlOption);
                $('.Inspection_Control_container #' + dvToRender).append(container);
                FieldCounter = FieldCounter + 1;
            }
            else {
                var Id = ControlCaption.replace(/\s/g, "_") + "_" + FieldCounter;
                var container = ('<div class="col-sm-3" id="' + Id + '" style = "display:inline-block"><div class="form-group" id=' + sectionnameforid + '_' + ControlCaption + '><label id="lbldropdownlist">' + ControlCaption + '</label>' +
                    '<select class="from-control" style="width:100%">');// id =' + sectionnameforid + '_' + ControlCaption + '>' );
                for (var i = 0; i < ControlOptionArray.length; i++) {
                    container = container + ("<option>" + ControlOptionArray[i] + "</option>");
                }
                container = container + ('</select><label class="field_pointeraction"><input checked class= "check_private" type = "checkbox" name="Private Field"> Private Field</label>' +
                    '<a href = "#" class= "edit_field" style = "margin-left:10px;"> Edit</a>' +
                    '<a href = "#" class= "remove_field" style = "margin-left:10px;" > Remove</a></div></div>');
                GetSetJsonInputType('DropDownList', ControlCaption, FieldCounter, Id, ControlOption);
                FieldCounter = FieldCounter + 1;
                $('.input_fields_container').append(container);
            }
        }

        else if (ControlName == "CheckBox") {

            if (InspectionControlName == "InspectionControl") {
                var Id = ControlCaption.replace(/\s/g, "_") + "_" + FieldCounter;
                var container = ('<div class="col-sm-3" id="' + Id + '"  style="display:inline-block"><div class="form-group" id=' + sectionnameforid + ' _' + ControlCaption + '><label id="lblcheckbox">' + ControlCaption + '</label><br>');
                for (var i = 0; i < ControlOptionArray.length; i++) {
                    container = container + ('<label class="checkbox-inline"><input type="checkbox"/>' + ControlOptionArray[i] + '</label>');
                }
                //'<label><input class= "check_NA" type = "checkbox" name="NA Field">NA</label>' +
                container = container + ('<br><label class="inspection_pointeraction" ><input checked class= "check_private" type = "checkbox" name="Private Field"> Private Field</label>' +
                    '<a href = "#" class= "edit_inspection_field_controls" style = "margin-left:10px;">Edit</a>' +
                    '<a href = "#" class= "remove_inspection_field_controls" style = "margin-left:10px;" > Remove</a ></div></div> ');
                var CurrentSelectedVal = $("#ddlInspectionStatus").val();
                var dvToRender = GetDivId(CurrentSelectedVal);
                GetSetJsonInspectionInputTypeData('CheckBox', ControlCaption, FieldCounter, CurrentSelectedVal, Id, ControlOption);
                $('.Inspection_Control_container #' + dvToRender).append(container);
                FieldCounter = FieldCounter + 1;
            }
            else {
                var Id = ControlCaption.replace(/\s/g, "_") + "_" + FieldCounter;
                var container = ('<div class="col-sm-3" id="' + Id + '"  style="display:inline-block"><div class="form-group" id=' + sectionnameforid + ' _' + ControlCaption + '><label id="lblcheckbox">' + ControlCaption + '</label><br>');
                for (var i = 0; i < ControlOptionArray.length; i++) {
                    container = container + ('<label class="checkbox-inline"><input type="checkbox"/>' + ControlOptionArray[i] + '</label>');
                }
                container = container + ('<br><label class="field_pointeraction"><input checked class= "check_private" type = "checkbox" name="Private Field"> Private Field</label>' +
                    '<a href = "#" class= "edit_field" style = "margin-left:10px;"> Edit</a>' +
                    '<a href = "#" class= "remove_field" style = "margin-left:10px;" > Remove</a ></div></div>');
                GetSetJsonInputType('CheckBox', ControlCaption, FieldCounter, Id, ControlOption);
                FieldCounter = FieldCounter + 1;
                $('.input_fields_container').append(container);
            }
        }

        else if (ControlName == "Radio") {

            if (InspectionControlName == "InspectionControl") {
                var Id = ControlCaption.replace(/\s/g, "_") + "_" + FieldCounter;
                var container = ('<div class="col-sm-3" id="' + Id + '"  style="display:inline-block"><div class="form-group"  id =' + sectionnameforid + '_' + ControlCaption + '><label id="lblradio">' + ControlCaption + '</label><br>');
                for (var i = 0; i < ControlOptionArray.length; i++) {
                    container = container + ('<label class="radio-inline"><input type="radio"/>' + ControlOptionArray[i] + '</label>');
                }
                //'<label><input class= "check_NA" type = "checkbox" name="NA Field">NA</label>' +
                container = container + ('<br><label class="inspection_pointeraction"><input checked class= "check_private" type = "checkbox" name="Private Field"> Private Field</label>' +
                    '<a href = "#" class= "edit_inspection_field_controls" style = "margin-left:10px;">Edit</a>' +
                    '<a href = "#" class= "remove_inspection_field_controls" style = "margin-left:10px;" > Remove</a ></div></div> ');
                var CurrentSelectedVal = $("#ddlInspectionStatus").val();
                var dvToRender = GetDivId(CurrentSelectedVal);
                GetSetJsonInspectionInputTypeData('Radio', ControlCaption, FieldCounter, CurrentSelectedVal, Id, ControlOption);
                $('.Inspection_Control_container #' + dvToRender).append(container);
                FieldCounter = FieldCounter + 1;
            }
            else {
                var Id = ControlCaption.replace(/\s/g, "_") + "_" + FieldCounter;
                var container = ('<div class="col-sm-3" id="' + Id + '"  style="display:inline-block"><div class="form-group"  id =' + sectionnameforid + '_' + ControlCaption + '><label id="lblradio">' + ControlCaption + '</label><br>');
                for (var i = 0; i < ControlOptionArray.length; i++) {
                    container = container + ('<label class="radio-inline"><input type="radio"/>' + ControlOptionArray[i] + '</label>');
                }
                container = container + ('<br><label class="field_pointeraction"><input checked class= "check_private" type = "checkbox" name="Private Field"> Private Field</label>' +
                    '<a href = "#" class= "edit_field" style = "margin-left:10px;"> Edit</a>' +
                    '<a href = "#" class= "remove_field" style = "margin-left:10px;">Remove</a></div></div> ');
                GetSetJsonInputType('Radio', ControlCaption, FieldCounter, Id, ControlOption);
                FieldCounter = FieldCounter + 1;
                $('.input_fields_container').append(container);
            }
        }
        $("#lblHiddenInspectionControl").text("");
    });

    $('#EditControlOptions').click(function () {
        //if (!isSpellCheckCorrect) {
        //    ValidateInput();
        //}
        debugger;
        var FieldId = $("#OldControlCaptionId").val();
        //var OldControlCaption = $("#OldControlCaptionId").val();
        var ControlName = $("#lblControlCaptionEditId").text();
        var ControlCaption = $("#ControlCaptionEditId").val();
        var ControlOption = $("#txtCaptionOptionEdit").val();
        var IsSectionFieldforEdit = $("#IsSectionFieldForEdit").val();
        // ControlOptionArray = ControlOption.split(",");
        var OldSectionName = $("#OldSectionName").val();
        if (OldSectionName == "") {
            OldSectionName = $("#sectionid").val();
        }
        var InspectionControlName = $("#lblHiddenInspectionControlEdit").text();
        var checkedAttribute = "";
        var IsFieldPrivate = true;

        if ((ControlCaption == "" || ControlCaption == undefined) && (ControlOption == "" || ControlOption == undefined)) {
            $("#spanControlCaptionIdEditError, #spanCaptionOptionEditError").css("display", "block");
            return false;
        }
        else if (ControlCaption == "" || ControlCaption == undefined) {
            $("#spanControlCaptionIdEditError").css("display", "block");
            return false;
        }
        else if (ControlOption == "" || ControlOption == undefined) {
            $("#spanCaptionOptionEditError").css("display", "block");
            return false;
        }
        if (!VerifyUserInput(ControlCaption)) {
            return false;
        }
        if (!VerifyUserInput(ControlOption)) {
            return false;

        }

        var labelname = "";
      
        switch (ControlName) {
            case 'DropDownList': labelname = "#lbldropdownlist"; break;
            case 'CheckBox': labelname = "#lblcheckbox"; break;
            case 'Radio': labelname = "#lblradio"; break;
            default: break;
        }
        if (InspectionControlName == "InspectionControl") {
            var CurrentSelectedStatus = $("#ddlInspectionStatus").val();
            var dvToRender = GetDivId(CurrentSelectedStatus);
            switch (CurrentSelectedStatus) {
                case 'P': index = PInspectionInputTypeArray.findIndex(m => m.Id == FieldId);
                    if (index > -1) {
                        PInspectionInputTypeArray[index].Caption = ControlCaption;
                        PInspectionInputTypeArray[index].Option = ControlOption;
                        IsFieldPrivate = PInspectionInputTypeArray[index].IsFieldPrivate;
                    }
                    else {
                        var InspectionIndex = InspectionInputTypeDataArray.findIndex(m => m.Id == InspectionControlId);
                        if (InspectionIndex > -1) {
                            var FieldIndex = InspectionInputTypeDataArray[InspectionIndex].InspectionControlArray[0].InspectionInputTypeArray.findIndex(m => m.Id == FieldId);
                            InspectionInputTypeDataArray[InspectionIndex].InspectionControlArray[0].InspectionInputTypeArray[FieldIndex].Caption = ControlCaption;
                            InspectionInputTypeDataArray[InspectionIndex].InspectionControlArray[0].InspectionInputTypeArray[FieldIndex].Option = ControlOption;
                            IsFieldPrivate = InspectionInputTypeDataArray[InspectionIndex].InspectionControlArray[0].InspectionInputTypeArray[FieldIndex].IsFieldPrivate;
                        }
                        else {
                            var sectionindex = SectionDataArray.findIndex(m => m.Name == OldSectionName);
                            if (sectionindex > -1) {
                                var InspectionIndex = SectionDataArray[sectionindex].InspectionControlTypeArray.findIndex(m => m.Id == InspectionControlId);
                                var FieldIndex = SectionDataArray[sectionindex].InspectionControlTypeArray[InspectionIndex].InspectionControlArray[0].InspectionInputTypeArray.findIndex(m => m.Id == FieldId);
                                SectionDataArray[sectionindex].InspectionControlTypeArray[InspectionIndex].InspectionControlArray[0].InspectionInputTypeArray[FieldIndex].Caption = ControlCaption;
                                SectionDataArray[sectionindex].InspectionControlTypeArray[InspectionIndex].InspectionControlArray[0].InspectionInputTypeArray[FieldIndex].Option = ControlOption;
                                IsFieldPrivate = SectionDataArray[sectionindex].InspectionControlTypeArray[InspectionIndex].InspectionControlArray[0].InspectionInputTypeArray[FieldIndex].IsFieldPrivate;
                            }
                        }
                    }

                    break;
                case 'F': index = FInspectionInputTypeArray.findIndex(m => m.Id == FieldId);
                    if (index > -1) {
                        FInspectionInputTypeArray[index].Caption = ControlCaption;
                        FInspectionInputTypeArray[index].Option = ControlOption;
                        IsFieldPrivate = FInspectionInputTypeArray[index].IsFieldPrivate;
                    }
                    else {
                        var InspectionIndex = InspectionInputTypeDataArray.findIndex(m => m.Id == InspectionControlId);
                        if (InspectionIndex > -1) {
                            var FieldIndex = InspectionInputTypeDataArray[InspectionIndex].InspectionControlArray[1].InspectionInputTypeArray.findIndex(m => m.Id == FieldId);
                            InspectionInputTypeDataArray[InspectionIndex].InspectionControlArray[1].InspectionInputTypeArray[FieldIndex].Caption = ControlCaption;
                            InspectionInputTypeDataArray[InspectionIndex].InspectionControlArray[1].InspectionInputTypeArray[FieldIndex].Option = ControlOption;
                            IsFieldPrivate = InspectionInputTypeDataArray[InspectionIndex].InspectionControlArray[1].InspectionInputTypeArray[FieldIndex].IsFieldPrivate;
                        }
                        else {
                            var sectionindex = SectionDataArray.findIndex(m => m.Name == OldSectionName);
                            if (sectionindex > -1) {
                                var InspectionIndex = SectionDataArray[sectionindex].InspectionControlTypeArray.findIndex(m => m.Id == InspectionControlId);
                                var FieldIndex = SectionDataArray[sectionindex].InspectionControlTypeArray[InspectionIndex].InspectionControlArray[1].InspectionInputTypeArray.findIndex(m => m.Id == FieldId);
                                SectionDataArray[sectionindex].InspectionControlTypeArray[InspectionIndex].InspectionControlArray[1].InspectionInputTypeArray[FieldIndex].Caption = ControlCaption;
                                SectionDataArray[sectionindex].InspectionControlTypeArray[InspectionIndex].InspectionControlArray[1].InspectionInputTypeArray[FieldIndex].Option = ControlOption;
                                IsFieldPrivate = SectionDataArray[sectionindex].InspectionControlTypeArray[InspectionIndex].InspectionControlArray[1].InspectionInputTypeArray[FieldIndex].IsFieldPrivate;
                            }
                        }
                    }
                    break;
                default:
                    break;
            }
            //$('.Inspection_Control_container #' + dvToRender).find('label:contains(' + OldControlCaption + ')').text(ControlCaption);
          
            if (IsFieldPrivate) checkedAttribute = "checked";
            $('.Inspection_Control_container #' + dvToRender + ' div[Id = ' + FieldId + ']').find('' + labelname + '').text(ControlCaption);
            $.ajax({
                type: 'Get',
                url: '/form/GenerateHtml',
                data: { 'caption': ControlCaption, 'options': ControlOption, 'inputType': ControlName, 'isEditingControl': true },
                success: function (data) {
                    //$('.Inspection_Control_container #' + dvToRender).find('label:contains(' + ControlCaption + ')').parent().html(data +
                    //    '<label><input class="check_private" type="checkbox" name="Private Field">Private Field</label>' +
                    //    '<label><input class= "check_NA" type = "checkbox" name="NA Field">NA<label>' +
                    //    '<a href="#" class="edit_inspection_field_controls" style="margin-left: 10px;")>Edit</a>' +
                    //    '<a href="#" class="remove_inspection_field_controls" style="margin-left: 10px;")>Remove</a></div>');
                    $('.Inspection_Control_container #' + dvToRender + ' div[Id = ' + FieldId + ']').children().html(data +
                        '<label  class="inspection_pointeraction"><input '+ checkedAttribute + ' class="check_private" type="checkbox" name="Private Field">Private Field</label>' +
                        '<a href="#" class="edit_inspection_field_controls" style="margin-left: 10px;")>Edit</a>' +
                        '<a href="#" class="remove_inspection_field_controls" style="margin-left: 10px;")>Remove</a></div>');

                }
            });
            $("#lblHiddenInspectionControlEdit").text("");
        }
        else {
            var index = InputTypeDataArray.findIndex(m => m.Id == FieldId);
            if (index > -1) {
                InputTypeDataArray[index].Caption = ControlCaption;
                InputTypeDataArray[index].Option = ControlOption;
                IsFieldPrivate = InputTypeDataArray[index].IsFieldPrivate;
            }
            else {
                var sectionindex = SectionDataArray.findIndex(m => m.Name == OldSectionName);
                if (sectionindex > -1) {
                    var inputindex = SectionDataArray[sectionindex].InputTypeArray.findIndex(m => m.Id == FieldId);
                    if (inputindex > -1) {
                        SectionDataArray[sectionindex].InputTypeArray[inputindex].Caption = ControlCaption;
                        SectionDataArray[sectionindex].InputTypeArray[inputindex].Option = ControlOption;
                        IsFieldPrivate = SectionDataArray[sectionindex].InputTypeArray[inputindex].IsFieldPrivate;
                    }
                }
            }

            if (IsFieldPrivate) checkedAttribute = "checked";
            // var controlid = "#" + OldSectionName + "_" + OldControlCaption;
            //$(".input_fields_container").find('label:contains(' + OldControlCaption + ')').text(ControlCaption);
            $(".input_fields_container  div[id='" + FieldId + "']").find('' + labelname + '').text(ControlCaption);
            $.ajax({
                type: 'Get',
                url: '/form/GenerateHtml',
                data: { 'caption': ControlCaption, 'options': ControlOption, 'inputType': ControlName, 'isEditingControl': true },
                success: function (data) {
                    //$(".input_fields_container").find('label:contains(' + ControlCaption + ')').parent().html(data +
                    //    '<label><input class="check_private" type="checkbox" name="Private Field">Private Field</label>' +
                    //    '<a href="#" class="edit_field" style="margin-left: 10px;")>Edit</a>' +
                    //    '<a href="#" class="remove_field" style="margin-left: 10px;")>Remove</a></div>');

                    $(".input_fields_container  div[id='" + FieldId + "']").children().html(data +
                        '<label class="field_pointeraction"><input '+ checkedAttribute +' class="check_private" type="checkbox" name="Private Field">Private Field</label>' +
                        '<a href="#" class="edit_field" style="margin-left: 10px;")>Edit</a>' +
                        '<a href="#" class="remove_field" style="margin-left: 10px;")>Remove</a></div>');
                }
            });

            $("#IsSectionFieldForEdit").val(false);
        }
    });

    //MultiLevel
    $("#addmultilevel,#addmultilevel1,#addmultilevel2").click(function () {
        debugger;
        var levelName = $(this).attr('name');
        switch (levelName) {
            case 'Multilevel1': multiLevelObject1 = {};
                levelPosition="Level1";
                $(".inputControls_1").addClass("pointernone");
                $(".multilevel_fields_container_1").empty();
                $("#txtMultilevelQuestion1").val("");
                $("#ddlMultilevelAnswer1").empty().append('<option value="" selected disabled>Select</option>');
                $("#btnMultilevelAnswer1").removeAttr("disabled");
                break;

            case 'Multilevel2': multiLevelObject2 = {};
                levelPosition = "Level2";
                $(".inputControls_2").addClass("pointernone");
                $(".multilevel_fields_container_2").empty();
                $("#txtMultilevelQuestion2").val("");
                $("#ddlMultilevelAnswer2").empty().append('<option value="" selected disabled>Select</option>');
                $("#btnMultilevelAnswer2").removeAttr("disabled");
                break;
            case 'Multilevel3': multiLevelObject3 = {};
                levelPosition = "Level3";
                $(".inputControls_3").addClass("pointernone");
                $(".multilevel_fields_container_3").empty();
                $("#txtMultilevelQuestion3").val("");
                $("#ddlMultilevelAnswer3").empty().append('<option value="" selected disabled>Select</option>');
                $("#btnMultilevelAnswer3").removeAttr("disabled");
                break;
            default:
                break;
        }
    });

    $("#SaveMultiLevelOption").click(function (e) {
        e.preventDefault();
        debugger;
        var noOfOptions = $("#txtNoofMultilevelOption").val();
        var optionDescription = $("#txtMultilevelOptionDescription").val();
        optionDescription = optionDescription.replace(/\n/g, '').trim();
        var optionDescriptionArray = optionDescription.split(',');
        var isModelValid = true;

        if (noOfOptions == "" || noOfOptions == undefined) { $("#spanChildNodeNumberError").css("display", "block"); isModelValid = false; }
        if (optionDescription == "" || optionDescription == undefined) { $("#spanChildNodeNamesError").css("display", "block"); isModelValid = false; }
        if (!isModelValid) {
            return false;
        }

        if (optionDescriptionArray.length != noOfOptions) {
            $("#spanChildCountError").css("display", "block");
            return false;
        }
        else {
            $("#spanChildCountError").css("display", "none");
        }

        if (levelPosition == "Level1") {
            $("#ddlMultilevelAnswer1").removeAttr('disabled');
            $.each(optionDescriptionArray, function (index, value) {
                var Id = value.replace(/\s/g, "_") + "_" + mulitLevelIdCounter;
                var contentId = "Content_" + Id;
                var childNode = {
                    Id: Id,
                    ContentId: contentId,
                    FieldCaption: value,
                    ParentId: multiLevelObject1.Id,
                    Level: multiLevelObject1.Level,
                    ParentIndex: multiLevelObject1.Index,
                    Index: index,
                    MultiLevelInputTypeArray: [],
                    MultiLevelInspectionInputTypeArray: [],
                    MultiLevelArray: []
                }
                multiLevelObject1.Answers.push(childNode);
                $("#ddlMultilevelAnswer1").append($('<option></option>').val(Id).html(value))
                mulitLevelIdCounter = mulitLevelIdCounter + 1;
                $(".multilevel_fields_container_1").append("<div class='answerContent' id=" + contentId + " style='display:none'></div>")
                $(".multilevel_fields_container_1 #" + contentId).sortable({ scroll: true, scrollSensitivity: 100, scrollSpeed: 70, tolerance: "pointer", cursor: "move" });
                $("#btnMultilevelAnswer1").attr("disabled", true);
            });
        }
        else if (levelPosition == "Level2") {
            $("#ddlMultilevelAnswer2").removeAttr('disabled');
            //var questionLevel1 = $("#txtMultilevelQuestion1").val();
            $.each(optionDescriptionArray, function (index, value) {
                var Id = value.replace(/\s/g, "_") + "_" + mulitLevelIdCounter;
                var contentId = "Content_" + Id;
                var childNode = {
                    Id: Id,
                    ContentId: contentId,
                    FieldCaption: value,
                    ParentId: multiLevelObject2.Id,
                    Level: multiLevelObject2.Level,
                    ParentIndex: multiLevelObject2.Index,
                    Index: index,
                    MultiLevelInputTypeArray: [],
                    MultiLevelInspectionInputTypeArray: [],
                    MultiLevelArray: []
                }
                multiLevelObject2.Answers.push(childNode);
                $("#ddlMultilevelAnswer2").append($('<option></option>').val(Id).html(value))
                mulitLevelIdCounter = mulitLevelIdCounter + 1;
                $(".multilevel_fields_container_2").append("<div class='answerContent' id=" + contentId + " style='display:none'></div>")
                $(".multilevel_fields_container_2 #" + contentId).sortable({ scroll: true, scrollSensitivity: 100, scrollSpeed: 70, tolerance: "pointer", cursor: "move" });
                $("#btnMultilevelAnswer2").attr("disabled", true);
            });
        }
        else if(levelPosition == "Level3") {
            $("#ddlMultilevelAnswer3").removeAttr('disabled');
            //var questionLevel1 = $("#txtMultilevelQuestion1").val();
            $.each(optionDescriptionArray, function (index, value) {
                var Id = value.replace(/\s/g, "_") + "_" + mulitLevelIdCounter;
                var contentId = "Content_" + Id;
                var childNode = {
                    Id: Id,
                    ContentId: contentId,
                    FieldCaption: value,
                    ParentId: multiLevelObject3.Id,
                    Level: multiLevelObject3.Level,
                    ParentIndex: multiLevelObject3.Index,
                    Index: index,
                    MultiLevelInputTypeArray: [],
                    MultiLevelInspectionInputTypeArray: [],
                    MultiLevelArray: []
                }
                multiLevelObject3.Answers.push(childNode);
                $("#ddlMultilevelAnswer3").append($('<option></option>').val(Id).html(value))
                mulitLevelIdCounter = mulitLevelIdCounter + 1;
                $(".multilevel_fields_container_3").append("<div class='answerContent' id=" + contentId + " style='display:none'></div>")
                $(".multilevel_fields_container_3 #" + contentId).sortable({ scroll: true, scrollSensitivity: 100, scrollSpeed: 70, tolerance: "pointer", cursor: "move" });
                $("#btnMultilevelAnswer3").attr("disabled", true);
            });
        }
    });


    $('.input_fields_container').on("click", ".remove_multilevel_field_1", function (e) {
        debugger;
        e.preventDefault();
        $(this).parent().parent().remove();

        var multilevelId = $(this).parent().parent().attr('id');
        var index = parentMultiLevelArray.findIndex(m => m.Id == multilevelId);
        if (index > -1) {
            parentMultiLevelArray.splice(index, 1);
        }
        else {
            //Removal while editing
            var sectionId = $("#OldSectionId").val();
            var sectionindex = SectionDataArray.findIndex(m => m.Id == sectionId);
            if (sectionindex > -1) {
                var multilevelindex = SectionDataArray[sectionindex].MultiLevelTypeArray.findIndex(m => m.Id == multilevelId);
                if (multilevelindex > -1) {
                    SectionDataArray[sectionindex].MultiLevelTypeArray.splice(multilevelindex, 1);
                }
            }
        }
    });

    $('.input_fields_container').on("click", ".edit_multilevel_field_1", function (e) {
        debugger;
        var id = $(this).parent().parent().attr('Id');
        var oldsectionId = $("#OldSectionId").val();
        var question = "";
        var options = [];
        var ParentMultilevelId = "";
        var questionindex = parentMultiLevelArray.findIndex(m => m.Id == id);
        if (questionindex > -1) {
            ParentMultilevelId = parentMultiLevelArray[questionindex].Id;
            question = parentMultiLevelArray[questionindex].Question;
            $.each(parentMultiLevelArray[questionindex].Answers, function (index) {
                debugger;
                options.push({
                    Text: parentMultiLevelArray[questionindex].Answers[index].FieldCaption,
                    Value: parentMultiLevelArray[questionindex].Answers[index].Id
                });
            });
        }
        else {
            sectionIndex = SectionDataArray.findIndex(m => m.Id == oldsectionId);
            if (sectionIndex > -1) {
                questionindex=SectionDataArray[sectionIndex].MultiLevelTypeArray.findIndex(m => m.Id == id);
                if (questionindex > -1) {
                    ParentMultilevelId = SectionDataArray[sectionIndex].MultiLevelTypeArray[questionindex].Id;
                    question = SectionDataArray[sectionIndex].MultiLevelTypeArray[questionindex].Question;
                    $.each(SectionDataArray[sectionIndex].MultiLevelTypeArray[questionindex].Answers, function (index) {
                        debugger;
                        options.push({
                            Text: SectionDataArray[sectionIndex].MultiLevelTypeArray[questionindex].Answers[index].FieldCaption,
                            Value: SectionDataArray[sectionIndex].MultiLevelTypeArray[questionindex].Answers[index].Id
                        });
                    });
                }
            }
        }

        $("#txtMultilevelQuestion1").val(question);
        $("#ddlMultilevelAnswer1").empty().append('<option value="" selected disabled>Select</option>');

        var htmlpart = $(this).parent().parent().find('.final_multilevel_container_1').html();
       
        $("#hdnParentMultilevelId1").val(ParentMultilevelId);
        $(".multilevel_fields_container_1").html(htmlpart);
        $.each(options, function (index) {
            $("#ddlMultilevelAnswer1").append("<option value=" + options[index].Value + ">" + options[index].Text + "</option>");
            $(".multilevel_fields_container_1 div[id=Content_" + options[index].Value + "]").css("display", "none");
        });

        var divIds = $.map($(".multilevel_fields_container_1").children("div[id]"), function (e, i) {
            return $(e).attr('id');
        });

        $.each(divIds, function (index) {
            $(".multilevel_fields_container_1 #" + divIds[index]).sortable({ scroll: true, scrollSensitivity: 100, scrollSpeed: 70, tolerance: "pointer", cursor: "move" });
        });

        //Level1 Edit and Remove link
        $(".multilevel_fields_container_1").parent().parent().find('.multilevel_edit_field,.multilevel_edit_inspection_field,.multilevel_remove_field,.multilevel_remove_inspection_field,' +
            '.edit_multilevel_field_2,.remove_multilevel_field_2').css("display", "inline");
        $(".multilevel_fields_container_1").parent().parent().find('#dvPparent .multilevel_edit_field,#dvFparent .multilevel_edit_field,#dvPparent .multilevel_remove_field,#dvFparent .multilevel_remove_field').css("display", "none");

        //Level2 Edit and Remove Link
        $(".multilevel_fields_container_1").find('.final_multilevel_container_2').find('.multilevel_edit_field,.multilevel_edit_inspection_field,.multilevel_remove_field,.multilevel_remove_inspection_field').css("display", "none");

        $(".multilevel_fields_container_1").find('.field_pointer').removeClass('field_pointer');
        $(".multilevel_fields_container_1 .final_multilevel_container_2," +
            ".multilevel_fields_container_1 .final_multilevel_container_3").find('.field_pointeraction').addClass('field_pointer');

        $("#btnMultilevelAnswer1").attr("disabled", true);
        $(".inputControls_1").addClass("pointernone");
        $("#addMultilevelOption1").modal('show');
    });

});