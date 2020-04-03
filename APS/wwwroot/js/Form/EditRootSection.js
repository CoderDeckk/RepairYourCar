
$(document).ready(function () {
    debugger;
 

    $("#dvSection, #addcontrolsort,#editcontrolsort,#dvP,#dvF").sortable({ scroll: true, scrollSensitivity: 100, scrollSpeed: 70, tolerance: "pointer", cursor: "move" });
    $('#ddlCodeStandards,#ddlmultilevelInspectionCodeStandards').multiselect({
        maxHeight: 200,
        includeSelectAllOption: true
    });

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
    $('#addtextbox').click(function (e) {
        e.preventDefault();

        if (TextBoxCaptionInput()) {
            $("#spanInputFieldError").css("display", "none");
            var sectionnameforid = $('#sectionid').val();
            var Id = sectionfieldidcreation;
            GetSetJsonInputType('TextBox', TextboxCaption, FieldCounter, Id);
            sectionfieldidcreation = sectionfieldidcreation - 1;
            //FieldCounter = FieldCounter + 1;
            $('.input_fields_container').append('<div class="col-sm-3" id="' + Id + '" style="display:inline-block"><div class="form-group"><label>' + TextboxCaption + '</label >' +
                '<input class="form-control" type="text" name="' + sectionnameforid + "_" + TextboxCaption + '"/>' +
                '<label class="field_pointeraction"><input checked class= "check_private" type = "checkbox" name="Private Field"> Private Field</label>' +
                '<a href="#" class="edit_field" style = "margin-left:10px;"> Edit</a>' +
                '<a href="#" class="remove_field" style="margin-left:10px;">Remove</a></div></div>'); //add input field
        }
    });

    $('#adddropdownlist').click(function (e) {
        e.preventDefault();
        $("#lblControlCaptionId").text("DropDownList");
        ClearControlOptions();
    });

    $('#addcheckbox').click(function (e) {
        e.preventDefault();
        $("#lblControlCaptionId").text("CheckBox");
        ClearControlOptions();
    });

    $('#addradiobutton').click(function (e) {
        e.preventDefault();
        $("#lblControlCaptionId").text("Radio");
        ClearControlOptions();
    });

    $('#addinspectioncontrol,#editinspectioncontrol').click(function () {
        $(".Inspection_Control_container #dvP, .Inspection_Control_container #dvF").empty();
        $("#ddlInspectionStatus").val("Select");
        $("#InspectionControlId").val("");
        $("#addinspectiontextbox, #addinspectiondropdownlist, #addinspectioncheckbox, #addinspectionradiobutton").addClass("pointernone");
        $("#spanInspectionControlIdError, #spanInspectionControlStatusError, #spanInputFieldError").css("display", "none");
        $('.Inspection_Control_container #dvPparent,' +
            '.Inspection_Control_container #dvFparent').removeClass().addClass("inspectioncontent");
        $("#ddlCodeStandards").multiselect('deselectAll', false);
        $('#ddlCodeStandards').multiselect('updateButtonText');
        $(".Inspection_Control_container #dvP, .Inspection_Control_container #dvF").sortable({ scroll: true, scrollSensitivity: 100, scrollSpeed: 70, tolerance: "pointer", cursor: "move" });
        $("#chkIsMetaInfo").prop("checked", false);
        $('.Inspection_Control_container #lblPAllPrivateField,.Inspection_Control_container #lblFAllPrivateField').css("display", "inline");
        $('.Inspection_Control_container #chkPAllPrivateField,.Inspection_Control_container #chkFAllPrivateField').prop("checked", false);
    });

    $("#edittextbox").click(function (e) {
        e.preventDefault();

        if (TextBoxCaptionInput()) {
            $("#spanInputFieldEditError").css("display", "none");
            var sectionnameforid = $('#sectionidEdit').val();
            var SectionId = $("#lblSectionIdforEdit").text();
            var Id = GetSetJsonInputTypeforNew(SectionId, "TextBox", TextboxCaption, FieldCounter);
            FieldCounter = FieldCounter + 1;
            $('.input_fields_container_Edit').append('<div class="col-md-3" id="' + Id + '" style="display:inline-block;"><div class="form-group"><label>' + TextboxCaption + '</label >' +
                '<input class="form-control" type="text" name="' + sectionnameforid + "_" + TextboxCaption + '"/></div>' +
                '<label class="field_pointeraction"><input checked class= "check_private_new" type = "checkbox" name="Private Field"> Private Field</label>' +
                '<a href="#" class="edit_field" style = "margin-left:10px;"> Edit</a>' +
                '<a href="#" class="remove_field_new" style="margin-left:10px;">Remove</a></div>'); //add input field
        }
    });

    $("#editdropdownlist").click(function (e) {
        e.preventDefault();
        $("#lblControlCaptionIdEdit").text("DropDownList");
        ClearControlOptions();
    });

    $("#editcheckbox").click(function (e) {
        e.preventDefault();
        $("#lblControlCaptionIdEdit").text("CheckBox");
        ClearControlOptions();
    });

    $("#editradiobutton").click(function (e) {
        e.preventDefault();
        $("#lblControlCaptionIdEdit").text("Radio");
        ClearControlOptions();
    });

    $('#add_section').click(function () {
        //if (!isSpellCheckCorrect) {
        //    ValidateInput();
        //}
        debugger;
        var sectionname = $('#sectionid').val();
        var sectionnnameforid = sectionname.replace(/\s/g, "_");

        var IsSectionForEdit = $("#IsSectionForEdit").val();
        var oldsectionid = $("#OldSectionName").val();
        //var oldsectionnameforid = oldsectionname.replace(/\s/g, "_");

        //var selectedSectionValue = $("#ddlSectionList :selected").val();
        //var selectedSectionValueid = selectedSectionValue.replace(/\s/g, "_");
        //var SectionInsertionPosition = "";

        //if (IsSectionForEdit == "true") {
        //    if (oldsectionname == selectedSectionValue) {
        //        $("#spanSectionListError").css("display", "block");
        //        return false;
        //    }
        //    else {
        //        $("#spanSectionListError").css("display", "none");

        //    }

        //}
        if (sectionname == "" || sectionname == undefined) {
            $("#dvSectionIdError").css("display", "block");
            return false;
        }
        if ($('.input_fields_container').is(':empty')) {
            $("#spanInputFieldError").css("display", "block");
            return false;
        }

        var IsSectionNameExist = formdata.FormSections.findIndex(m => m.Name == sectionname);
        if (IsSectionNameExist > -1 && IsSectionForEdit == "") {
            $("#spanSectionExistError").css("display", "block");
            return false;
        }
        else {
            $("#spanSectionExistError").css("display", "none");
        }

        if (!VerifyUserInput(sectionname)) {
            return false;
        }
        var controlOrder = $('#addcontrolsort').sortable("toArray");
        for (var i = 0; i < controlOrder.length; i++) {
            var index = FormSectionFieldDataModel.findIndex(m => m.Id == controlOrder[i]);
            var InspectionIndex = InspectionInputTypeDataArray.findIndex(m => m.Id == controlOrder[i]);
            var MultilevelIndex = parentMultiLevelArray.findIndex(m => m.Id == controlOrder[i]);
            if (index > -1) {
                FormSectionFieldDataModel[index].FieldSequence = i + 1;
            }
            else if (InspectionIndex > -1) {
                InspectionInputTypeDataArray[InspectionIndex].FieldSequence = i + 1;
            }
            else if (MultilevelIndex > -1) {
                parentMultiLevelArray[MultilevelIndex].FieldSequence = i + 1;
            }
            else if (IsSectionForEdit == "true") {
                sectionIndex = formdata.FormSections.findIndex(m => m.Id == oldsectionid);
                if (sectionIndex > -1) {
                    var inputindex = formdata.FormSections[sectionIndex].FormSectionFields.findIndex(m => m.Id == controlOrder[i]);
                    var InspectionIndex = formdata.FormSections[sectionIndex].FormSectionInspectionField.findIndex(m => m.Id == controlOrder[i]);
                    var MultiLevelIndex = formdata.FormSections[sectionIndex].FormSectionMultilevelField.findIndex(m => m.Id == controlOrder[i]);
                    if (inputindex > -1) {
                        formdata.FormSections[sectionIndex].FormSectionFields[inputindex].FieldSequence = i + 1;
                    }
                    else if (InspectionIndex > -1) {
                        formdata.FormSections[sectionIndex].FormSectionInspectionField[InspectionIndex].FieldSequence = i + 1;
                    }
                    else if (MultilevelIndex > -1) {
                        formdata.FormSections[sectionIndex].FormSectionMultilevelField[MultilevelIndex].FieldSequence = i + 1;
                    }
                }
            }
        }

        var quantitymedian = $('#QuantityMedianCheckBox').prop("checked");
        var quantitymediandisplaytext = "No";
        if (quantitymedian) {
            quantitymediandisplaytext = "Yes";
        }

        $(".input_fields_container .edit_field,.input_fields_container .remove_field, .input_fields_container .edit_inspection_field," +
            ".input_fields_container .remove_inspection_field,.input_fields_container .edit_multilevel_field_1, .input_fields_container .remove_multilevel_field_1").css("display", "none");

        $('.input_fields_container').find('.field_pointeraction').addClass('field_pointer');
        var htmlpart = $('.input_fields_container').html();
        if (sectionname && $('.input_fields_container:not(:empty)')) {

            //var sectionId = "section_" + sectionfieldidcreation;
            //InputTypeDataArray = [];
            if (IsSectionForEdit == false) {
                //var parentSectionId = "parentSection_" + sectionnnameforid;
                GetSetJsonSectionData(sectionfieldidcreation, sectionname, FormSectionFieldDataModel, quantitymedian, InspectionInputTypeDataArray, parentMultiLevelArray);
                
                $("#dvSection").append("<div id='" + sectionfieldidcreation + "'style='clear:both;padding:0' class='col-md-12 panel-group'>" +
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
                sectionfieldidcreation = sectionfieldidcreation - 1;
            }
            else {
                //var parentSectionId = oldsectionnameforid + "_parent";
                GetSetJsonSectionDataForEdit(oldsectionid, sectionname, quantitymedian, FormSectionFieldDataModel, InspectionInputTypeDataArray, parentMultiLevelArray);
                
                $("#dvSection div[id = '" + oldsectionid + "']").html("<div class='col-md-12 form-header panel panel-default s-accordion--arrow'>" +
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
                    "</div><br>");

            }
            FormSectionFieldDataModel = [];
            InspectionInputTypeDataArray = [];
            parentMultiLevelArray = [];
            $("#OldSectionName").val("");
            ClearControls();
        }
    });

    $("#btnaddsection").click(function () {
        e.preventDefault();
        $("#dvSectionIdError,#spanSectionExistError").css("display", "none");
        $("#IsSectionForEdit").val(false);
        FormSectionFieldDataModel = [];
        InspectionInputTypeDataArray = [];
        parentMultiLevelArray = [];
        $("#OldSectionName").val("");
    });

    function GetSetJsonSectionDataForEdit(oldsectionid, sectionname, quantitymedian, FormSectionFieldDataModel, InspectionInputTypeDataArray, parentMultiLevelArray) {
        sectionIndex = formdata.FormSections.findIndex(m => m.Id == oldsectionid);
        if (sectionIndex > -1) {
            formdata.FormSections[sectionIndex].Name = sectionname;
            formdata.FormSections[sectionIndex].quantitymedian = quantitymedian;
            $.each(FormSectionFieldDataModel, function (index) {
                formdata.FormSections[sectionIndex].FormSectionFields.push(FormSectionFieldDataModel[index]);
            });
            $.each(InspectionInputTypeDataArray, function (index) {
                formdata.FormSections[sectionIndex].FormSectionInspectionField.push(InspectionInputTypeDataArray[index]);
            });
            $.each(parentMultiLevelArray, function (index) {
                formdata.FormSections[sectionIndex].FormSectionMultilevelField.push(parentMultiLevelArray[index]);
            });
        }
    }

    $('#save_edit_section').click(function () {
        //if (!isSpellCheckCorrect) {
        //    ValidateInput();
        //}
        var sectionname = $('#sectionidEdit').val();
        var sectionId = $("#lblSectionIdforEdit").text();
        var quantitymedian = $("#QuantityMedianCheckBoxEdit").prop("checked");
        var oldsectionname = $("#OldSectionNameEdit").val();

        if (sectionname == "" || sectionname == undefined) {
            $("#dvSectionIdEditError").css("display", "block");
            return false;
        }
        if ($('.input_fields_container_Edit').is(':empty')) {
            $("#spanInputFieldEditError").css("display", "block");
            return false;
        }

        var IsSectionNameExist = formdata.FormSections.findIndex(m => m.Name == sectionname);
        if (IsSectionNameExist > -1) {
            if (oldsectionname == "" || oldsectionname != sectionname) {
                $("#spanSectionExistErrorEdit").css("display", "block");
                return false;
            }

        }
        else {
            $("#spanSectionExistErrorEdit").css("display", "none");
        }

        if (!VerifyUserInput(sectionname)) {
            return false;
        }
        sectionIndex = formdata.FormSections.findIndex(m => m.Name == oldsectionname);

        debugger;
        var controlOrder = $('#editcontrolsort').sortable("toArray");
        for (var i = 0; i < controlOrder.length; i++) {
            var index = FormSectionFieldDataModel.findIndex(m => m.Id == controlOrder[i]);
            var InspectionIndex = InspectionInputTypeDataArray.findIndex(m => m.Id == controlOrder[i]);
            var MultilevelIndex = parentMultiLevelArray.findIndex(m => m.Id == controlOrder[i]);
            if (index > -1) {
                FormSectionFieldDataModel[index].FieldSequence = i + 1;
            }
            else if (InspectionIndex > -1) {
                InspectionInputTypeDataArray[InspectionIndex].FieldSequence = i + 1;
            }
            else if (MultilevelIndex > -1) {
                parentMultiLevelArray[MultilevelIndex].FieldSequence = i + 1;
            }
            else {//if (IsSectionForEdit == "true")

                if (sectionIndex > -1) {
                    var inputindex = formdata.FormSections[sectionIndex].FormSectionFields.findIndex(m => m.Id == controlOrder[i]);
                    var InspectionIndex = formdata.FormSections[sectionIndex].FormSectionInspectionField.findIndex(m => m.Id == controlOrder[i]);
                    var MultiLevelIndex = formdata.FormSections[sectionIndex].FormSectionMultilevelField.findIndex(m => m.Id == controlOrder[i]);
                    if (inputindex > -1) {
                        formdata.FormSections[sectionIndex].FormSectionFields[inputindex].FieldSequence = i + 1;
                    }
                    else if (InspectionIndex > -1) {
                        formdata.FormSections[sectionIndex].FormSectionInspectionField[InspectionIndex].FieldSequence = i + 1;
                    }
                    else if (MultilevelIndex > -1) {
                        formdata.FormSections[sectionIndex].FormSectionMultilevelField[MultilevelIndex].FieldSequence = i + 1;
                    }
                }

            }
        }

        $(".input_fields_container_Edit .remove_field_edit,.input_fields_container_Edit .edit_inspection_field, .input_fields_container_Edit .edit_section_field,.input_fields_container_Edit .remove_field_new," +
            ".input_fields_container_Edit .edit_field,.input_fields_container_Edit .edit_multilevel_field_1,.input_fields_container_Edit .remove_inspection_field,.input_fields_container_Edit .remove_multilevel_field_1").css("display", "none");
        debugger;
        $('.input_fields_container_Edit').find('.field_pointeraction').addClass('field_pointer');
        var htmlpart = $('.input_fields_container_Edit').html();
        if (sectionname && $('.input_fields_container_Edit:not(:empty)')) {
            sectionIndex = formdata.FormSections.findIndex(m => m.Id == sectionId);
            formdata.FormSections[sectionIndex].Name = sectionname;
            formdata.FormSections[sectionIndex].QuantityMedian = quantitymedian;


            if (InspectionInputTypeDataArray.length > 0) {
                $.each(InspectionInputTypeDataArray, function (index) {
                    //var inspectiondata = {
                    //    Id: InspectionInputTypeDataArray[index].Id,
                    //    Name: InspectionInputTypeDataArray[index].Name,
                    //    IsMetaInfoRequired: InspectionInputTypeDataArray[index].IsMetaInfoRequired,
                    //    CodeStandardId: InspectionInputTypeDataArray[index].CodeStandardId,
                    //    FormSectionInspectionStatus: InspectionInputTypeDataArray[index].FormSectionInspectionStatus,
                    //    CodeStandardId: InspectionInputTypeDataArray[index].CodeStandard,
                    //    FieldSequence: InspectionInputTypeDataArray[index].FieldSequence
                       
                    //}

                    formdata.FormSections[sectionIndex].FormSectionInspectionField.push(InspectionInputTypeDataArray[index]);
                });


            }
            if (parentMultiLevelArray.length > 0) {
                $.each(parentMultiLevelArray, function (index) {
                    var multileveldata = {
                        Id: parentMultiLevelArray[index].Id,
                        Question: parentMultiLevelArray[index].Question,
                        Answers: parentMultiLevelArray[index].Answers,
                        IsFieldPrivate: parentMultiLevelArray[index].IsFieldPrivate,
                        FieldSequence: parentMultiLevelArray[index].FieldSequence
                    }
                    formdata.FormSections[sectionIndex].FormSectionMultilevelField.push(multileveldata);
                });
            }

            var searchDivId = sectionId + "_htmlcontent";
           
            $("#dvSection").find("#" + searchDivId).html(htmlpart);

            var quantitymediandisplaytext = "No";
            if (quantitymedian) {
                quantitymediandisplaytext = "Yes";

            }

            $("#" + sectionId).find('#lblsectionname').text(sectionname);
            $("#" + sectionId).find('#lblQuantityMedian').text(quantitymediandisplaytext);
            $("#lblSectionIdforEdit").text("");
            InspectionInputTypeDataArray = [];
            parentMultiLevelArray = [];
            ClearControlsforEdit();
        }
    });

    $('#AddControlOptions').click(function () {
        //if (!isSpellCheckCorrect) {
        //    ValidateInput();
        //}
        debugger;
        var ControlName = $("#lblControlCaptionId").text();
        var ControlCaption = $("#ControlCaptionId").val();
        var ControlOption = $("#txtCaptionOption").val();
        var SectionFieldIdforEdit = $("#lblSectionFieldIdforEdit").text();
        var SectionIdforEdit = $("#lblSectionIdforEdit").text();
        ControlOption = ControlOption.replace(/\n/g, '').trim();
        //ControlCaption.trim();

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
        else if (SectionFieldIdforEdit != "" && SectionIdforEdit != "") {
            if (!VerifyUserInput(ControlCaption)) {
                return false;
            }
            if (!VerifyUserInput(ControlOption)) {
                return false;

            }
            var index = formdata.FormSections.findIndex(m => m.Id == SectionIdforEdit);
            if (index > -1) {
                var sectionFieldIndex = formdata.FormSections[index].FormSectionFields.findIndex(m => m.Id == SectionFieldIdforEdit);
                if (sectionFieldIndex > -1) {
                    var OldCaption = formdata.FormSections[index].FormSectionFields[sectionFieldIndex].FieldCaption;
                    // var ControlOptionEdit = $("#txtCaptionOption").val();
                    var ControlOptionArrayEdit = ControlOption.split(",");

                    formdata.FormSections[index].FormSectionFields[sectionFieldIndex].FieldCaption = ControlCaption;
                    formdata.FormSections[index].FormSectionFields[sectionFieldIndex].FieldInputOptions = ControlOption;
                    $(".input_fields_container_Edit").find('label:contains(' + OldCaption + ')').text(ControlCaption);

                    $.ajax({
                        type: 'Get',
                        url: '/form/GenerateHtml',
                        data: { 'caption': ControlCaption, 'options': ControlOption, 'inputType': ControlName, 'isEditingControl': true },
                        success: function (data) {
                            //$(ctrlId).parent().children('div').first().html(data);

                            //data = data + ""
                            $(".input_fields_container_Edit").find('label:contains(' + ControlCaption + ')').parent().html(data);
                        }
                    });
                    return true;
                }
            }
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
        var Id = sectionfieldidcreation;
        if (ControlName == "DropDownList") {

            if (InspectionControlName == "InspectionControl") {
                //var Id = ControlCaption.replace(/\s/g, "_") + "_" + FieldCounter;
                var container = ('<div class="col-sm-3" id="' + Id + '" style = "display:inline-block"><div class="form-group"><label>' + ControlCaption + '</label>' +
                    '<select class="from-control" style="width:100%">');
                for (var i = 0; i < ControlOptionArray.length; i++) {
                    container = container + ("<option>" + ControlOptionArray[i] + "</option>");
                }
                container = container + ('</select></div><label class="inspection_pointeraction"><input checked class= "check_private" type = "checkbox" name="Private Field"> Private Field</label>' +
                    //'<label><input class= "check_NA" type = "checkbox" name="NA Field"> NA</label>' +
                    '<a href="#" class="edit_inspection_field_controls" style="margin-left: 10px;")>Edit</a>' +
                    '<a href = "#" class= "remove_inspection_field_controls" style = "margin-left:10px;" > Remove</a ></div>');
                var CurrentSelectedVal = $("#ddlInspectionStatus").val();
                var dvToRender = GetDivId(CurrentSelectedVal);
                GetSetJsonInspectionInputTypeData('DropDownList', ControlCaption, CurrentSelectedVal, Id, ControlOption);
                $('.Inspection_Control_container #' + dvToRender).append(container);
                sectionfieldidcreation = sectionfieldidcreation - 1;
                //FieldCounter = FieldCounter + 1;
            }

            else {
                //var Id = ControlCaption.replace(/\s/g, "_") + "_" + FieldCounter;
                var container = ('<div class="col-sm-3" id="' + Id + '" style = "display:inline-block" id=' + sectionnameforid + '_' + ControlCaption + '><div class="form-group"><label>' + ControlCaption + '</label>' +
                    '<select class="from-control" style="width:100%">');
                for (var i = 0; i < ControlOptionArray.length; i++) {
                    container = container + ("<option>" + ControlOptionArray[i] + "</option>");
                }
                container = container + ('</select><label class="field_pointeraction"><input checked class= "check_private" type = "checkbox" name="Private Field"> Private Field</label>' +
                    '<a href = "#" class= "edit_field" style = "margin-left:10px;"> Edit</a>' +
                    '<a href = "#" class= "remove_field" style = "margin-left:10px;" > Remove</a ></div></div>');
                GetSetJsonInputType('DropDownList', ControlCaption, FieldCounter, Id, ControlOption);
                sectionfieldidcreation = sectionfieldidcreation - 1;
                FieldCounter = FieldCounter + 1;
                $('.input_fields_container').append(container);
            }
        }

        else if (ControlName == "CheckBox") {

            if (InspectionControlName == "InspectionControl") {
                //var Id = ControlCaption.replace(/\s/g, "_") + "_" + FieldCounter;
                var container = ('<div class="col-sm-3" id="' + Id + '" style="display:inline-block"><div class="form-group"><label>' + ControlCaption + '</label><br>');
                for (var i = 0; i < ControlOptionArray.length; i++) {
                    container = container + ('<label class="checkbox-inline"><input type="checkbox"/>' + ControlOptionArray[i] + '</label>');
                }
                container = container + ('<br></div><label class="inspection_pointeraction"><input checked class= "check_private" type = "checkbox" name="Private Field"> Private Field</label>' +
                    //'<label><input class= "check_NA" type = "checkbox" name="NA Field"> NA</label>' +
                    '<a href="#" class="edit_inspection_field_controls" style="margin-left: 10px;")>Edit</a>' +
                    '<a href = "#" class= "remove_inspection_field_controls" style = "margin-left:10px;" > Remove</a ></div> ');
                var CurrentSelectedVal = $("#ddlInspectionStatus").val();
                var dvToRender = GetDivId(CurrentSelectedVal);
                GetSetJsonInspectionInputTypeData('CheckBox', ControlCaption, CurrentSelectedVal, Id, ControlOption);
                $('.Inspection_Control_container #' + dvToRender).append(container);
                sectionfieldidcreation = sectionfieldidcreation - 1;
                // FieldCounter = FieldCounter + 1;
            }
            else {
                //var Id = ControlCaption.replace(/\s/g, "_") + "_" + FieldCounter;
                var container = ('<div class="col-sm-3" id="' + Id + '" style="display:inline-block" id =' + sectionnameforid + '_' + ControlCaption + '><div class="form-group"><label>' + ControlCaption + '</label><br>');
                for (var i = 0; i < ControlOptionArray.length; i++) {
                    container = container + ('<label class="checkbox-inline"><input type="checkbox"/>' + ControlOptionArray[i] + '</label>');
                }
                container = container + ('<br><label class="field_pointeraction"><input checked class= "check_private" type = "checkbox" name="Private Field"> Private Field</label>' +
                    '<a href = "#" class= "edit_field" style = "margin-left:10px;"> Edit</a>' +
                    '<a href = "#" class= "remove_field" style = "margin-left:10px;" > Remove</a ></div> ');
                GetSetJsonInputType('CheckBox', ControlCaption, FieldCounter, Id, ControlOption);
                sectionfieldidcreation = sectionfieldidcreation - 1;
                FieldCounter = FieldCounter + 1;
                $('.input_fields_container').append(container);
            }
        }

        else if (ControlName == "Radio") {

            if (InspectionControlName == "InspectionControl") {
                //var Id = ControlCaption.replace(/\s/g, "_") + "_" + FieldCounter;
                var container = ('<div class="col-sm-3" id="' + Id + '" style="display:inline-block"><div class="form-group"><label>' + ControlCaption + '</label><br>');
                for (var i = 0; i < ControlOptionArray.length; i++) {
                    container = container + ('<label class="radio-inline"><input type="radio"/>' + ControlOptionArray[i] + '</label>');
                }
                container = container + ('<br></div><label class="inspection_pointeraction"><input checked class= "check_private" type = "checkbox" name="Private Field"> Private Field</label>' +
                    //'<label><input class= "check_NA" type = "checkbox" name="NA Field"> NA</label>' +
                    '<a href="#" class="edit_inspection_field_controls" style="margin-left: 10px;")>Edit</a>' +
                    '<a href = "#" class= "remove_inspection_field_controls" style = "margin-left:10px;" > Remove</a ></div>');
                var CurrentSelectedVal = $("#ddlInspectionStatus").val();
                var dvToRender = GetDivId(CurrentSelectedVal);
                GetSetJsonInspectionInputTypeData('Radio', ControlCaption, CurrentSelectedVal, Id, ControlOption);
                $('.Inspection_Control_container #' + dvToRender).append(container);
                sectionfieldidcreation = sectionfieldidcreation - 1;
            }
            else {
                //var Id = ControlCaption.replace(/\s/g, "_") + "_" + FieldCounter;
                var container = ('<div class="col-sm-3" id="' + Id + '" style="display:inline-block" id =' + sectionnameforid + '_' + ControlCaption + '><div class="form-group"><label>' + ControlCaption + '</label><br>');
                for (var i = 0; i < ControlOptionArray.length; i++) {
                    container = container + ('<label class="radio-inline"><input type="radio"/>' + ControlOptionArray[i] + '</label>');
                }
                container = container + ('<br><label class="field_pointeraction"><input checked class= "check_private" type = "checkbox" name="Private Field"> Private Field</albel>' +
                    '<a href = "#" class= "edit_field" style = "margin-left:10px;"> Edit</a>' +
                    '<a href = "#" class= "remove_field" style = "margin-left:10px;" > Remove</a ></div> ');
                GetSetJsonInputType('Radio', ControlCaption, FieldCounter, Id, ControlOption);
                sectionfieldidcreation = sectionfieldidcreation - 1;
                FieldCounter = FieldCounter + 1;
                $('.input_fields_container').append(container);
            }
        }
        $("#lblHiddenInspectionControl").text("");
        $("#lblSectionFieldIdforEdit").text("");
        //$("#lblSectionIdforEdit").text("");
    });

    $("#EditControlOptions").click(function () {
        //if (!isSpellCheckCorrect) {
        //    ValidateInput();
        //}
        debugger;
        var ControlName = $("#lblControlCaptionIdEdit").text();
        var ControlCaption = $("#ControlCaptionIdEdit").val();
        var ControlOption = $("#txtCaptionOptionEdit").val();
        //ControlOptionArray = ControlOption.split(",");
        ControlOption = ControlOption.replace(/\n/g, '').trim();
        var oldsectionname = $("#OldSectionName").val();
        var oldsectionnameforedit = $("#OldSectionNameEdit").val();

        if (oldsectionnameforedit != "") {
            oldsectionname = $("#sectionidEdit").val();

        }
        else if (oldsectionname == "") {
            oldsectionname = $("#sectionid").val();
        }

        var OldControlCaption = $("#OldControlCaptionId").val();
        var InspectionControlName = $("#lblHiddenInspectionControlEdit").text();

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
        if (InspectionControlName == "InspectionControl") {
            var CurrentSelectedStatus = $("#ddlInspectionStatus").val();
            var dvToRender = GetDivId(CurrentSelectedStatus);

            switch (CurrentSelectedStatus) {
                case 'P': index = PInspectionInputTypeArray.findIndex(m => m.FieldCaption == OldControlCaption);
                    if (index > -1) {
                        PInspectionInputTypeArray[index].FieldCaption = ControlCaption;
                        PInspectionInputTypeArray[index].FieldInputOptions = ControlOption;
                    }
                    else {
                        var InspectionIndex = InspectionInputTypeDataArray.findIndex(m => m.Id == InspectionControlId);
                        if (InspectionIndex > -1) {
                            var FieldIndex = InspectionInputTypeDataArray[InspectionIndex].FormSectionInspectionStatus[0].FormSectionInspectionDataArray.findIndex(m => m.FieldCaption == OldControlCaption);
                            InspectionInputTypeDataArray[InspectionIndex].FormSectionInspectionStatus[0].FormSectionInspectionDataArray[FieldIndex].FieldCaption = ControlCaption;
                            InspectionInputTypeDataArray[InspectionIndex].FormSectionInspectionStatus[0].FormSectionInspectionDataArray[FieldIndex].FieldInputOptions = ControlOption;
                        }
                        else {
                            sectionIndex = formdata.FormSections.findIndex(m => m.Name == oldsectionname);
                            if (sectionIndex > -1) {
                                var InspectionIndex = formdata.FormSections[sectionIndex].FormSectionInspectionField.findIndex(m => m.Id == InspectionControlId);
                                var FieldIndex = formdata.FormSections[sectionIndex].FormSectionInspectionField[InspectionIndex].FormSectionInspectionStatus[0].FormSectionInspectionDataArray.findIndex(m => m.FieldCaption == OldControlCaption);
                                formdata.FormSections[sectionIndex].FormSectionInspectionField[InspectionIndex].FormSectionInspectionStatus[0].FormSectionInspectionDataArray[FieldIndex].FieldCaption = ControlCaption;
                                formdata.FormSections[sectionIndex].FormSectionInspectionField[InspectionIndex].FormSectionInspectionStatus[0].FormSectionInspectionDataArray[FieldIndex].FieldInputOptions = ControlOption;;
                            }
                        }
                    }
                    break;
                case 'F': index = FInspectionInputTypeArray.findIndex(m => m.FieldCaption == OldControlCaption);
                    if (index > -1) {
                        FInspectionInputTypeArray[index].FieldCaption = ControlCaption;
                        FInspectionInputTypeArray[index].FieldInputOptions = ControlOption;
                    }
                    else {
                        var InspectionIndex = InspectionInputTypeDataArray.findIndex(m => m.Id == InspectionControlId);
                        if (InspectionIndex > -1) {
                            var FieldIndex = InspectionInputTypeDataArray[InspectionIndex].FormSectionInspectionStatus[1].FormSectionInspectionDataArray.findIndex(m => m.FieldCaption == OldControlCaption);
                            InspectionInputTypeDataArray[InspectionIndex].FormSectionInspectionStatus[1].FormSectionInspectionDataArray[FieldIndex].FieldCaption = ControlCaption;
                            InspectionInputTypeDataArray[InspectionIndex].FormSectionInspectionStatus[1].FormSectionInspectionDataArray[FieldIndex].FieldInputOptions = ControlOption;
                        }
                        else {
                            sectionIndex = formdata.FormSections.findIndex(m => m.Name == oldsectionname);
                            if (sectionIndex > -1) {
                                var InspectionIndex = formdata.FormSections[sectionIndex].FormSectionInspectionField.findIndex(m => m.Id == InspectionControlId);
                                var FieldIndex = formdata.FormSections[sectionIndex].FormSectionInspectionField[InspectionIndex].FormSectionInspectionStatus[1].FormSectionInspectionDataArray.findIndex(m => m.FieldCaption == OldControlCaption);
                                formdata.FormSections[sectionIndex].FormSectionInspectionField[InspectionIndex].FormSectionInspectionStatus[1].FormSectionInspectionDataArray[FieldIndex].FieldCaption = ControlCaption;
                                formdata.FormSections[sectionIndex].FormSectionInspectionField[InspectionIndex].FormSectionInspectionStatus[1].FormSectionInspectionDataArray[FieldIndex].FieldInputOptions = ControlOption;;
                            }
                        }
                    }
                    break;
                default:
                    break;
            }
            $('.Inspection_Control_container #' + dvToRender).find('label:contains(' + OldControlCaption + ')').text(ControlCaption);
            $.ajax({
                type: 'Get',
                url: '/form/GenerateHtml',
                data: { 'caption': ControlCaption, 'options': ControlOption, 'inputType': ControlName, 'isEditingControl': true },
                success: function (data) {
                    $('.Inspection_Control_container #' + dvToRender).find('label:contains(' + ControlCaption + ')').parent().html(data)// +
                    //'<label><input class="check_private" type="checkbox" name="Private Field">Private Field</label>' +
                    //'<input class= "check_NA" type = "checkbox" name="NA Field">NA' +
                    //'<a href="#" class="edit_inspection_field_controls" style="margin-left: 10px;")>Edit</a>' +
                    //'<a href="#" class="remove_inspection_field_controls" style="margin-left: 10px;")>Remove</a></div>');

                }
            });
            $("#lblHiddenInspectionControlEdit").text("");
        }
        else {
            var IsSectionFieldForEdit = $("#IsSectionFieldForEdit").val();
            if (IsSectionFieldForEdit == "true") {

                var index = FormSectionFieldDataModel.findIndex(m => m.FieldCaption == OldControlCaption);
                if (index > -1) {
                    FormSectionFieldDataModel[index].FieldCaption = ControlCaption;
                    FormSectionFieldDataModel[index].FieldInputOptions = ControlOption;
                }
                else {
                    sectionIndex = formdata.FormSections.findIndex(m => m.Name == oldsectionname);
                    if (sectionIndex > -1) {
                        var sectionFieldIndex = formdata.FormSections[sectionIndex].FormSectionFields.findIndex(m => m.FieldCaption == OldControlCaption);
                        if (sectionFieldIndex > -1) {
                            formdata.FormSections[sectionIndex].FormSectionFields[sectionFieldIndex].FieldCaption = ControlCaption;
                            formdata.FormSections[sectionIndex].FormSectionFields[sectionFieldIndex].FieldInputOptions = ControlOption;
                        }
                    }
                }

                if (oldsectionnameforedit != "") {
                    $(".input_fields_container_Edit").find('label:contains(' + OldControlCaption + ')').text(ControlCaption);
                    //.filter(function () {
                    //    return $(this).text === OldControlCaption;
                    //}).text(ControlCaption);
                    $.ajax({
                        type: 'Get',
                        url: '/form/GenerateHtml',
                        data: { 'caption': ControlCaption, 'options': ControlOption, 'inputType': ControlName, 'isEditingControl': true },
                        success: function (data) {
                            $(".input_fields_container_Edit").find('label:contains(' + ControlCaption + ')').parent().html(data);

                        }
                    });

                }
                else {
                    $(".input_fields_container").find('label:contains(' + OldControlCaption + ')').text(ControlCaption);
                    //.filter(function () {
                    //    return $(this).text === OldControlCaption;
                    //}).text(ControlCaption);
                    $.ajax({
                        type: 'Get',
                        url: '/form/GenerateHtml',
                        data: { 'caption': ControlCaption, 'options': ControlOption, 'inputType': ControlName, 'isEditingControl': true },
                        success: function (data) {
                            $(".input_fields_container").find('label:contains(' + ControlCaption + ')').parent().html(data +
                                '<label class="field_pointeraction"><input class="check_private_new" type="checkbox" name="Private Field">Private Field</label>' +
                                '<a href="#" class="edit_field" style="margin-left: 10px;")>Edit</a>' +
                                '<a href="#" class="remove_field" style="margin-left: 10px;")>Remove</a></div>');

                        }
                    });

                }

            }
            else {
                var SectionIdforEdit = $("#lblSectionIdforEdit").text();
                var Id = GetSetJsonInputTypeforNew(SectionIdforEdit, ControlName, ControlCaption, FieldCounter, ControlOption);
                sectionfieldidcreation = sectionfieldidcreation - 1;
                FieldCounter = FieldCounter + 1;
                $.ajax({
                    type: 'Get',
                    url: '/form/GenerateHtmlForCreate',
                    data: { 'caption': ControlCaption, 'options': ControlOption, 'inputType': ControlName, Id },
                    success: function (data) {
                        //alert(data);
                        $(".input_fields_container_Edit").append(data +
                            '<label class="field_pointeraction"><input checked class="check_private_new" type="checkbox" name="Private Field">Private Field</label>' +
                            '<a href="#" class="edit_field" style="margin-left: 10px;")>Edit</a>' +
                            '<a href="#" class="remove_field_new" style="margin-left: 10px;")>Remove</a></div>');

                    }
                });

            }
            $("#IsSectionFieldForEdit").val(false);
        }
    });

    $('#dvSection').on("click", ".remove_field", function (e) {
        e.preventDefault();
        var labelname = $(this).parent('div').children('#lblsectionname').text();
        var index = formdata.FormSections.findIndex(m => m.Name == labelname);
        if (index > -1) {
            formdata.FormSections.splice(index, 1);
        }
        $(this).parent().parent().parent('div').remove();
    });

    $('#dvSection').on("click", ".edit_section_field", function (e) {
        debugger;
        $("#addsection").modal('show');
        var sectionName = $(this).parent().parent().find('#lblsectionname').text();
        var sectionnameforid = sectionName.replace(/\s/g, "_");
        var sectionId = $(this).parent().parent().parent().attr('id');
        
        var quantitymedian = $(this).parent().parent().parent().children().find('#lblquantitymedian').text();
        var sectioncontentid = "#" + sectionnameforid + "_htmlcontent";
        var htmlpart = $(this).parent().parent().parent().find(sectioncontentid).html();
        $("#spanSectionListError").css("display", "none");
        $("#sectionid").val(sectionName);
        if (quantitymedian == "true") {
            $("#QuantityMedianCheckBox").prop("checked", true);
        }
        else {
            $("#QuantityMedianCheckBox").prop("checked", false);
        }
        $('.input_fields_container').html(htmlpart);
        $(".input_fields_container .edit_field,.input_fields_container .remove_field,.input_fields_container .edit_inspection_field, .input_fields_container .remove_inspection_field," +
            ".input_fields_container .edit_multilevel_field_1,.input_fields_container .remove_multilevel_field_1").css("display", "inline");
        $('.input_fields_container').find('.field_pointer').removeClass('field_pointer');
        $("#IsSectionForEdit").val(true);
        $("#OldSectionId").val(sectionId);
        $("#OldSectionName").val(sectionId);
        $("#addtextbox, #adddropdownlist, #addcheckbox, #addradiobutton ,#addinspectioncontrol,#addmultilevel").removeClass("pointernone");
    });

    $('.input_fields_container,.input_fields_container_Edit').on("click", ".edit_field", function (e) {
        var inputtype = "";
        var inputoptions = "";
        $("#IsSectionFieldForEdit").val(true);
        var oldsectionname = $("#OldSectionName").val();
        var oldsectionnameforedit = $("#OldSectionNameEdit").val();

        if (oldsectionnameforedit != "") {
            oldsectionname = $("#sectionidEdit").val();

        }
        else if (oldsectionname == "") {
            oldsectionname = $("#sectionid").val();
        }

        var labelname = $(this).parents().children('div').children('label').first().text();
        // var index = formdata.FormSections.findIndex(m => m.Name == oldsectionname);
        var index = FormSectionFieldDataModel.findIndex(m => m.FieldCaption == labelname);
        if (index > -1) {
            inputtype = FormSectionFieldDataModel[index].FieldInputType;
            inputoptions = FormSectionFieldDataModel[index].FieldInputOptions;

        }
        else {
            sectionIndex = formdata.FormSections.findIndex(m => m.Name == oldsectionname);
            if (sectionIndex > -1) {
                var sectionFieldIndex = formdata.FormSections[sectionIndex].FormSectionFields.findIndex(m => m.FieldCaption == labelname);
                if (sectionFieldIndex > -1) {
                    inputtype = formdata.FormSections[sectionIndex].FormSectionFields[sectionFieldIndex].FieldInputType;
                    inputoptions = formdata.FormSections[sectionIndex].FormSectionFields[sectionFieldIndex].FieldInputOptions;
                }
            }
        }
        if (inputtype.toLowerCase() == "textbox") {
            //TextBoxCaptionInput();
            if (TextBoxCaptionInput()) {
                if (index > -1) {
                    FormSectionFieldDataModel[index].FieldCaption = TextboxCaption;
                }
                else {
                    sectionIndex = formdata.FormSections.findIndex(m => m.Name == oldsectionname);
                    if (sectionIndex > -1) {
                        var sectionFieldIndex = formdata.FormSections[sectionIndex].FormSectionFields.findIndex(m => m.FieldCaption == labelname);
                        if (sectionFieldIndex > -1) {
                            formdata.FormSections[sectionIndex].FormSectionFields[sectionFieldIndex].FieldCaption = TextboxCaption;
                        }
                    }

                }
                $(".input_fields_container,.input_fields_container_Edit").find('label:contains(' + labelname + ')').html(TextboxCaption);
                return true;
            }
            else return false;
        }
        $("#lblControlCaptionIdEdit").text(inputtype);
        $("#ControlCaptionIdEdit").val(labelname);
        $("#txtCaptionOptionEdit").val(inputoptions);
        $("#OldControlCaptionId").val(labelname);
        $("#editOption").modal('show');
    });



    $('.input_fields_container').on("click", ".remove_field", function (e) {
        e.preventDefault();
        $(this).parent().parent('div').remove();

        var labelname = $(this).parent('div').children('label').first().text();
        var index = FormSectionFieldDataModel.findIndex(m => m.FieldCaption == labelname);
        if (index > -1)
            FormSectionFieldDataModel.splice(index, 1);
    });

    $('.input_fields_container').on("change", ".check_private", function (e) {
        e.preventDefault();
        debugger;
        var FieldId = $(this).parent().parent().parent().attr('id');
        var index = FormSectionFieldDataModel.findIndex(m => m.Id == FieldId);
        if (index > -1) {
            if ($(this).prop("checked") == true) {
                FormSectionFieldDataModel[index].IsFieldPrivate = true;
                $(this).attr("checked", "checked");
            }
            else if ($(this).prop("checked") == false) {
                FormSectionFieldDataModel[index].IsFieldPrivate = false;
                $(this).removeAttr("checked", "checked");
            }
        }
    });


    $('.input_fields_container_Edit').on("click", ".remove_field_new", function (e) {
        e.preventDefault();
        $(this).parent().remove();
        var sectionId = $("#lblSectionIdforEdit").text();
        var labelname = $(this).parents().children('div').children('label').first().text();
        var index = formdata.FormSections.findIndex(m => m.Id == sectionId);
        if (index > -1) {
            var sectionFieldIndex = formdata.FormSections[index].FormSectionFields.findIndex(m => m.FieldCaption == labelname);
            if (sectionFieldIndex > -1) {
                formdata.FormSections[index].FormSectionFields.splice(sectionFieldIndex, 1);

            }
        }
    });

    $('.input_fields_container_Edit').on("change", ".check_private_new,.check_private", function (e) {
        e.preventDefault();
        var sectionId = $("#lblSectionIdforEdit").text();
        var labelname = $(this).parents().children('div').children('label').first().text();
        var index = formdata.FormSections.findIndex(m => m.Id == sectionId);
        if (index > -1) {
            var sectionFieldIndex = formdata.FormSections[index].FormSectionFields.findIndex(m => m.FieldCaption == labelname);
            if ($(this).prop("checked") == true && sectionFieldIndex > -1) {
                formdata.FormSections[index].FormSectionFields[sectionFieldIndex].IsFieldPrivate = true;
                $(this).attr("checked", "checked");
            }
            else {
                formdata.FormSections[index].FormSectionFields[sectionFieldIndex].IsFieldPrivate = false;
                $(this).removeAttr("checked", "checked");
            }
        }
    });


    $('.Inspection_Control_container').on("change", ".check_private", function (e) {
        e.preventDefault();
        debugger;
        var FieldId = $(this).parent().parent().attr('id');
        var selectedvalue = $("#ddlInspectionStatus").val();
        var oldsectionname = $("#OldSectionName").val();

        if (oldsectionname == "") {
            oldsectionname = $("#OldSectionNameEdit").val();
        }
        if ($(this).prop("checked") == true) {
            $(this).attr("checked", "checked");
            switch (selectedvalue) {
                case 'P': var index = PInspectionInputTypeArray.findIndex(m => m.Id == FieldId);
                    if (index > -1) {
                        PInspectionInputTypeArray[index].IsFieldPrivate = true;
                    }
                    else {
                        var InspectionIndex = InspectionInputTypeDataArray.findIndex(m => m.Id == InspectionControlId);
                        if (InspectionIndex > -1) {
                            var FieldIndex = InspectionInputTypeDataArray[InspectionIndex].FormSectionInspectionStatus[0].FormSectionInspectionDataArray.findIndex(m => m.Id == FieldId);
                            InspectionInputTypeDataArray[InspectionIndex].FormSectionInspectionStatus[0].FormSectionInspectionDataArray[FieldIndex].IsFieldPrivate = true;
                        }
                        else {
                            sectionIndex = formdata.FormSections.findIndex(m => m.Name == oldsectionname);
                            if (sectionIndex > -1) {
                                var InspectionIndex = formdata.FormSections[sectionIndex].FormSectionInspectionField.findIndex(m => m.Id == InspectionControlId);
                                var FieldIndex = formdata.FormSections[sectionIndex].FormSectionInspectionField[InspectionIndex].FormSectionInspectionStatus[0].FormSectionInspectionDataArray.findIndex(m => m.Id == FieldId);
                                formdata.FormSections[sectionIndex].FormSectionInspectionField[InspectionIndex].FormSectionInspectionStatus[0].FormSectionInspectionDataArray[FieldIndex].IsFieldPrivate = true;
                            }
                        }
                    }

                    break;
                case 'F': var index = FInspectionInputTypeArray.findIndex(m => m.Id == FieldId);
                    if (index > -1) {
                        FInspectionInputTypeArray[index].IsFieldPrivate = true;
                    }
                    else {
                        var InspectionIndex = InspectionInputTypeDataArray.findIndex(m => m.Id == InspectionControlId);
                        if (InspectionIndex > -1) {
                            var FieldIndex = InspectionInputTypeDataArray[InspectionIndex].FormSectionInspectionStatus[1].FormSectionInspectionDataArray.findIndex(m => m.Id == FieldId);
                            InspectionInputTypeDataArray[InspectionIndex].FormSectionInspectionStatus[1].FormSectionInspectionDataArray[FieldIndex].IsFieldPrivate = true;
                        }
                        else {
                            sectionIndex = formdata.FormSections.findIndex(m => m.Name == oldsectionname);
                            if (sectionIndex > -1) {
                                var InspectionIndex = formdata.FormSections[sectionIndex].FormSectionInspectionField.findIndex(m => m.Id == InspectionControlId);
                                var FieldIndex = formdata.FormSections[sectionIndex].FormSectionInspectionField[InspectionIndex].FormSectionInspectionStatus[1].FormSectionInspectionDataArray.findIndex(m => m.Id == FieldId);
                                formdata.FormSections[sectionIndex].FormSectionInspectionField[InspectionIndex].FormSectionInspectionStatus[1].FormSectionInspectionDataArray[FieldIndex].IsFieldPrivate = true;
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
                    var index = PInspectionInputTypeArray.findIndex(m => m.Id == FieldId);
                    if (index > -1) {
                        PInspectionInputTypeArray[index].IsFieldPrivate = false;
                    }
                    else {
                        var InspectionIndex = InspectionInputTypeDataArray.findIndex(m => m.Id == InspectionControlId);
                        if (InspectionIndex > -1) {
                            var FieldIndex = InspectionInputTypeDataArray[InspectionIndex].FormSectionInspectionStatus[0].FormSectionInspectionDataArray.findIndex(m => m.Id == FieldId);
                            InspectionInputTypeDataArray[InspectionIndex].FormSectionInspectionStatus[0].FormSectionInspectionDataArray[FieldIndex].IsFieldPrivate = false;
                            InspectionInputTypeDataArray[InspectionIndex].FormSectionInspectionStatus[0].IsFieldPrivate = false;
                        }
                        else {
                            sectionIndex = formdata.FormSections.findIndex(m => m.Name == oldsectionname);
                            if (sectionIndex > -1) {
                                var InspectionIndex = formdata.FormSections[sectionIndex].FormSectionInspectionField.findIndex(m => m.Id == InspectionControlId);
                                var FieldIndex = formdata.FormSections[sectionIndex].FormSectionInspectionField[InspectionIndex].FormSectionInspectionStatus[0].FormSectionInspectionDataArray.findIndex(m => m.Id == FieldId);
                                formdata.FormSections[sectionIndex].FormSectionInspectionField[InspectionIndex].FormSectionInspectionStatus[0].FormSectionInspectionDataArray[FieldIndex].IsFieldPrivate = false;
                                formdata.FormSections[sectionIndex].FormSectionInspectionField[InspectionIndex].FormSectionInspectionStatus[0].IsFieldPrivate = false;
                            }
                        }
                    }

                    break;
                case 'F':
                    $(".Inspection_Control_container #chkFAllPrivateField").removeProp("checked", false).removeAttr("checked");
                    var index = FInspectionInputTypeArray.findIndex(m => m.Id == FieldId);
                    if (index > -1) {
                        FInspectionInputTypeArray[index].IsFieldPrivate = false;
                    }
                    else {
                        var InspectionIndex = InspectionInputTypeDataArray.findIndex(m => m.Id == InspectionControlId);
                        if (InspectionIndex > -1) {
                            var FieldIndex = InspectionInputTypeDataArray[InspectionIndex].FormSectionInspectionStatus[1].FormSectionInspectionDataArray.findIndex(m => m.Id == FieldId);
                            InspectionInputTypeDataArray[InspectionIndex].FormSectionInspectionStatus[1].FormSectionInspectionDataArray[FieldIndex].IsFieldPrivate = false;
                            InspectionInputTypeDataArray[InspectionIndex].FormSectionInspectionStatus[1].IsFieldPrivate = false;
                        }
                        else {
                            sectionIndex = formdata.FormSections.findIndex(m => m.Name == oldsectionname);
                            if (sectionIndex > -1) {
                                var InspectionIndex = formdata.FormSections[sectionIndex].FormSectionInspectionField.findIndex(m => m.Id == InspectionControlId);
                                var FieldIndex = formdata.FormSections[sectionIndex].FormSectionInspectionField[InspectionIndex].FormSectionInspectionStatus[1].FormSectionInspectionDataArray.findIndex(m => m.Id == FieldId);
                                formdata.FormSections[sectionIndex].FormSectionInspectionField[InspectionIndex].FormSectionInspectionStatus[1].FormSectionInspectionDataArray[FieldIndex].IsFieldPrivate = false;
                                formdata.FormSections[sectionIndex].FormSectionInspectionField[InspectionIndex].FormSectionInspectionStatus[1].IsFieldPrivate = false;
                            }
                        }
                    }
                    break;
                default: break;
            }
        }
    });

    $('.Inspection_Control_container').on("change", ".check_NA", function (e) {
        debugger;
        e.preventDefault();
        var FieldId = $(this).parent().parent().attr('id');
        var selectedvalue = $("#ddlInspectionStatus").val();
        var oldsectionname = $("#OldSectionName").val();

        if (oldsectionname == "") {
            oldsectionname = $("#OldSectionNameEdit").val();
        }
        if ($(this).prop("checked") == true) {
            //var labelname = $(this).parent().children().first().text();
            $(this).attr("checked", "checked");
            switch (selectedvalue) {
                case 'P': var index = PInspectionInputTypeArray.findIndex(m => m.Id == FieldId);
                    if (index > -1) {
                        PInspectionInputTypeArray[index].IsFieldNa = true;
                    }
                    else {
                        var InspectionIndex = InspectionInputTypeDataArray.findIndex(m => m.Id == InspectionControlId);
                        if (InspectionIndex > -1) {
                            var FieldIndex = InspectionInputTypeDataArray[InspectionIndex].FormSectionInspectionStatus[0].FormSectionInspectionDataArray.findIndex(m => m.Id == FieldId);
                            InspectionInputTypeDataArray[InspectionIndex].FormSectionInspectionStatus[0].FormSectionInspectionDataArray[FieldIndex].IsFieldNa = true;
                        }
                        else {
                            sectionIndex = formdata.FormSections.findIndex(m => m.Name == oldsectionname);
                            if (sectionIndex > -1) {
                                var InspectionIndex = formdata.FormSections[sectionIndex].FormSectionInspectionField.findIndex(m => m.Id == InspectionControlId);
                                var FieldIndex = formdata.FormSections[sectionIndex].FormSectionInspectionField[InspectionIndex].FormSectionInspectionStatus[0].FormSectionInspectionDataArray.findIndex(m => m.Id == FieldId);
                                formdata.FormSections[sectionIndex].FormSectionInspectionField[InspectionIndex].FormSectionInspectionStatus[0].FormSectionInspectionDataArray[FieldIndex].IsFieldNa = true;
                            }
                        }
                    }
                    break;
                case 'F': var index = FInspectionInputTypeArray.findIndex(m => m.Id == FieldId);
                    if (index > -1) {
                        FInspectionInputTypeArray[index].IsFieldNa = true;
                    }
                    else {
                        var InspectionIndex = InspectionInputTypeDataArray.findIndex(m => m.Id == InspectionControlId);
                        if (InspectionIndex > -1) {
                            var FieldIndex = InspectionInputTypeDataArray[InspectionIndex].FormSectionInspectionStatus[1].FormSectionInspectionDataArray.findIndex(m => m.Id == FieldId);
                            InspectionInputTypeDataArray[InspectionIndex].FormSectionInspectionStatus[1].FormSectionInspectionDataArray[FieldIndex].IsFieldNa = true;
                        }
                        else {
                            sectionIndex = formdata.FormSections.findIndex(m => m.Name == oldsectionname);
                            if (sectionIndex > -1) {
                                var InspectionIndex = formdata.FormSections[sectionIndex].FormSectionInspectionField.findIndex(m => m.Id == InspectionControlId);
                                var FieldIndex = formdata.FormSections[sectionIndex].FormSectionInspectionField[InspectionIndex].FormSectionInspectionStatus[1].FormSectionInspectionDataArray.findIndex(m => m.Id == FieldId);
                                formdata.FormSections[sectionIndex].FormSectionInspectionField[InspectionIndex].FormSectionInspectionStatus[1].FormSectionInspectionDataArray[FieldIndex].IsFieldNa = true;
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
                case 'P': var index = PInspectionInputTypeArray.findIndex(m => m.Id == FieldId);
                    if (index > -1) {
                        PInspectionInputTypeArray[index].IsFieldNa = null;
                    }
                    else {
                        var InspectionIndex = InspectionInputTypeDataArray.findIndex(m => m.Id == InspectionControlId);
                        if (InspectionIndex > -1) {
                            var FieldIndex = InspectionInputTypeDataArray[InspectionIndex].FormSectionInspectionStatus[0].FormSectionInspectionDataArray.findIndex(m => m.Id == FieldId);
                            InspectionInputTypeDataArray[InspectionIndex].FormSectionInspectionStatus[0].FormSectionInspectionDataArray[FieldIndex].IsFieldNa = null;
                        }
                        else {
                            sectionIndex = formdata.FormSections.findIndex(m => m.Name == oldsectionname);
                            if (sectionIndex > -1) {
                                var InspectionIndex = formdata.FormSections[sectionIndex].FormSectionInspectionField.findIndex(m => m.Id == InspectionControlId);
                                var FieldIndex = formdata.FormSections[sectionIndex].FormSectionInspectionField[InspectionIndex].FormSectionInspectionStatus[0].FormSectionInspectionDataArray.findIndex(m => m.Id == FieldId);
                                formdata.FormSections[sectionIndex].FormSectionInspectionField[InspectionIndex].FormSectionInspectionStatus[0].FormSectionInspectionDataArray[FieldIndex].IsFieldNa = null;
                            }
                        }
                    }
                    break;
                case 'F': var index = FInspectionInputTypeArray.findIndex(m => m.Id == FieldId);
                    if (index > -1) {
                        FInspectionInputTypeArray[index].IsFieldNa = null;
                    }
                    else {
                        var InspectionIndex = InspectionInputTypeDataArray.findIndex(m => m.Id == InspectionControlId);
                        if (InspectionIndex > -1) {
                            var FieldIndex = InspectionInputTypeDataArray[InspectionIndex].FormSectionInspectionStatus[1].FormSectionInspectionDataArray.findIndex(m => m.Id == FieldId);
                            InspectionInputTypeDataArray[InspectionIndex].FormSectionInspectionStatus[1].FormSectionInspectionDataArray[FieldIndex].IsFieldNa = null;
                        }
                        else {
                            sectionIndex = formdata.FormSections.findIndex(m => m.Name == oldsectionname);
                            if (sectionIndex > -1) {
                                var InspectionIndex = formdata.FormSections[sectionIndex].FormSectionInspectionField.findIndex(m => m.Id == InspectionControlId);
                                var FieldIndex = formdata.FormSections[sectionIndex].FormSectionInspectionField[InspectionIndex].FormSectionInspectionStatus[1].FormSectionInspectionDataArray.findIndex(m => m.Id == FieldId);
                                formdata.FormSections[sectionIndex].FormSectionInspectionField[InspectionIndex].FormSectionInspectionStatus[1].FormSectionInspectionDataArray[FieldIndex].IsFieldNa = null;
                            }
                        }
                    }
                    break;
                default: break;
            }
        }
    });

    $('.Inspection_Control_container').on("click", ".edit_inspection_field_controls", function (e) {

        var inputtype = "";
        var inputoptions = "";
        var oldsectionname = $("#OldSectionName").val();
        if (oldsectionname == "") {
            oldsectionname = $("#OldSectionNameEdit").val();

        }
        var inspectionstatus = $("#ddlInspectionStatus").val();
        //var labelname = $(this).parent().children().first().text();
        var labelname = $(this).parent().find('label').first().text();
        var FieldId = $(this).parent().attr('id');
        var index = ""
        debugger;
        switch (inspectionstatus) {
            case 'P': index = PInspectionInputTypeArray.findIndex(m => m.Id == FieldId);
                if (index > -1) {
                    inputtype = PInspectionInputTypeArray[index].FieldInputType;
                    inputoptions = PInspectionInputTypeArray[index].FieldInputOptions;
                }
                else {
                    var InspectionIndex = InspectionInputTypeDataArray.findIndex(m => m.Id == InspectionControlId);
                    if (InspectionIndex > -1) {
                        var FieldIndex = InspectionInputTypeDataArray[InspectionIndex].FormSectionInspectionStatus[0].FormSectionInspectionDataArray.findIndex(m => m.Id == FieldId);
                        inputtype = InspectionInputTypeDataArray[InspectionIndex].FormSectionInspectionStatus[0].FormSectionInspectionDataArray[FieldIndex].FieldInputType;
                        inputoptions = InspectionInputTypeDataArray[InspectionIndex].FormSectionInspectionStatus[0].FormSectionInspectionDataArray[FieldIndex].FieldInputOptions;
                    }
                    else {
                        sectionIndex = formdata.FormSections.findIndex(m => m.Name == oldsectionname);
                        if (sectionIndex > -1) {
                            var InspectionIndex = formdata.FormSections[sectionIndex].FormSectionInspectionField.findIndex(m => m.Id == InspectionControlId);
                            var FieldIndex = formdata.FormSections[sectionIndex].FormSectionInspectionField[InspectionIndex].FormSectionInspectionStatus[0].FormSectionInspectionDataArray.findIndex(m => m.Id == FieldId);
                            inputtype = formdata.FormSections[sectionIndex].FormSectionInspectionField[InspectionIndex].FormSectionInspectionStatus[0].FormSectionInspectionDataArray[FieldIndex].FieldInputType;
                            inputoptions = formdata.FormSections[sectionIndex].FormSectionInspectionField[InspectionIndex].FormSectionInspectionStatus[0].FormSectionInspectionDataArray[FieldIndex].FieldInputOptions;
                        }
                    }
                }
                break;
            case 'F': index = FInspectionInputTypeArray.findIndex(m => m.FieldCaption == labelname);
                if (index > -1) {
                    inputtype = FInspectionInputTypeArray[index].FieldInputType;
                    inputoptions = FInspectionInputTypeArray[index].FieldInputOptions;
                }
                else {
                    var InspectionIndex = InspectionInputTypeDataArray.findIndex(m => m.Id == InspectionControlId);
                    if (InspectionIndex > -1) {
                        var FieldIndex = InspectionInputTypeDataArray[InspectionIndex].FormSectionInspectionStatus[1].FormSectionInspectionDataArray.findIndex(m => m.Id == FieldId);
                        inputtype = InspectionInputTypeDataArray[InspectionIndex].FormSectionInspectionStatus[1].FormSectionInspectionDataArray[FieldIndex].FieldInputType;
                        inputoptions = InspectionInputTypeDataArray[InspectionIndex].FormSectionInspectionStatus[1].FormSectionInspectionDataArray[FieldIndex].FieldInputOptions;
                    }
                    else {
                        sectionIndex = formdata.FormSections.findIndex(m => m.Name == oldsectionname);
                        if (sectionIndex > -1) {
                            var InspectionIndex = formdata.FormSections[sectionIndex].FormSectionInspectionField.findIndex(m => m.Id == InspectionControlId);
                            var FieldIndex = formdata.FormSections[sectionIndex].FormSectionInspectionField[InspectionIndex].FormSectionInspectionStatus[1].FormSectionInspectionDataArray.findIndex(m => m.Id == FieldId);
                            inputtype = formdata.FormSections[sectionIndex].FormSectionInspectionField[InspectionIndex].FormSectionInspectionStatus[1].FormSectionInspectionDataArray[FieldIndex].FieldInputType;
                            inputoptions = formdata.FormSections[sectionIndex].FormSectionInspectionField[InspectionIndex].FormSectionInspectionStatus[1].FormSectionInspectionDataArray[FieldIndex].FieldInputOptions;
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
                            PInspectionInputTypeArray[index].FieldCaption = TextboxCaption;
                        }
                        else {
                            var InspectionIndex = InspectionInputTypeDataArray.findIndex(m => m.Id == InspectionControlId);
                            if (InspectionIndex > -1) {
                                var FieldIndex = InspectionInputTypeDataArray[InspectionIndex].FormSectionInspectionStatus[0].FormSectionInspectionDataArray.findIndex(m => m.Id == FieldId);
                                InspectionInputTypeDataArray[InspectionIndex].FormSectionInspectionStatus[0].FormSectionInspectionDataArray[FieldIndex].FieldCaption = TextboxCaption;
                            }
                            else {
                                sectionIndex = formdata.FormSections.findIndex(m => m.Name == oldsectionname);
                                if (sectionIndex > -1) {
                                    var InspectionIndex = formdata.FormSections[sectionIndex].FormSectionInspectionField.findIndex(m => m.Id == InspectionControlId);
                                    var FieldIndex = formdata.FormSections[sectionIndex].FormSectionInspectionField[InspectionIndex].FormSectionInspectionStatus[0].FormSectionInspectionDataArray.findIndex(m => m.Id == FieldId);
                                    formdata.FormSections[sectionIndex].FormSectionInspectionField[InspectionIndex].FormSectionInspectionStatus[0].FormSectionInspectionDataArray[FieldIndex].FieldCaption = TextboxCaption;
                                }
                            }
                        }
                        break;
                    case 'F': index = FInspectionInputTypeArray.findIndex(m => m.Id == FieldId);
                        if (index > -1) {
                            FInspectionInputTypeArray[index].FieldCaption = TextboxCaption;
                        }
                        else {
                            var InspectionIndex = InspectionInputTypeDataArray.findIndex(m => m.Id == InspectionControlId);
                            if (InspectionIndex > -1) {
                                var FieldIndex = InspectionInputTypeDataArray[InspectionIndex].FormSectionInspectionStatus[1].FormSectionInspectionDataArray.findIndex(m => m.Id == FieldId);
                                InspectionInputTypeDataArray[InspectionIndex].FormSectionInspectionStatus[1].FormSectionInspectionDataArray[FieldIndex].FieldCaption = TextboxCaption;
                            }
                            else {
                                sectionIndex = formdata.FormSections.findIndex(m => m.Name == oldsectionname);
                                if (sectionIndex > -1) {
                                    var InspectionIndex = formdata.FormSections[sectionIndex].FormSectionInspectionField.findIndex(m => m.Id == InspectionControlId);
                                    var FieldIndex = formdata.FormSections[sectionIndex].FormSectionInspectionField[InspectionIndex].FormSectionInspectionStatus[1].FormSectionInspectionDataArray.findIndex(m => m.Id == FieldId);
                                    formdata.FormSections[sectionIndex].FormSectionInspectionField[InspectionIndex].FormSectionInspectionStatus[1].FormSectionInspectionDataArray[FieldIndex].FieldCaption = TextboxCaption;
                                }
                            }
                        }
                        break;
                    default:
                        break;
                }
                $('.Inspection_Control_container #' + dvToRender).find('label:contains(' + labelname + ')').text(TextboxCaption);
                return true;
            }
            else return false;
        }
        $("#lblControlCaptionIdEdit").text(inputtype);
        $("#ControlCaptionIdEdit").val(labelname);
        $("#txtCaptionOptionEdit").val(inputoptions);
        $("#OldControlCaptionId").val(labelname);
        $("#lblHiddenInspectionControlEdit").text("InspectionControl");
        $("#editOption").modal('show');

    });

    $('.Inspection_Control_container').on("click", ".remove_inspection_field_controls", function (e) {
        e.preventDefault();
        debugger;
        $(this).parent('div').remove();
        var selectedvalue = $("#ddlInspectionStatus").val();
        var FieldId = $(this).parent().attr('id');
        var oldsectionname = $("#OldSectionName").val();
        if (oldsectionname == "") {
            oldsectionname = $("#OldSectionNameEdit").val();

        }
        //var labelname = $(this).parent('div').children('label').first().text();
        switch (selectedvalue) {
            case 'P': var index = PInspectionInputTypeArray.findIndex(m => m.Id == FieldId);
                if (index > -1) {
                    PInspectionInputTypeArray.splice(index, 1);
                }
                else {
                    var InspectionIndex = InspectionInputTypeDataArray.findIndex(m => m.Id == InspectionControlId);
                    if (InspectionIndex > -1) {
                        var FieldIndex = InspectionInputTypeDataArray[InspectionIndex].FormSectionInspectionStatus[0].FormSectionInspectionDataArray.findIndex(m => m.Id == FieldId);
                        if (FieldIndex > -1) {
                            InspectionInputTypeDataArray[InspectionIndex].FormSectionInspectionStatus[0].FormSectionInspectionDataArray.splice(FieldIndex, 1);
                        }
                    }
                    else {
                        sectionIndex = formdata.FormSections.findIndex(m => m.Name == oldsectionname);
                        if (sectionIndex > -1) {
                            var InspectionIndex1 = formdata.FormSections[sectionIndex].FormSectionInspectionField.findIndex(m => m.Id == InspectionControlId);
                            var FieldIndex = formdata.FormSections[sectionIndex].FormSectionInspectionField[InspectionIndex1].FormSectionInspectionStatus[0].FormSectionInspectionDataArray.findIndex(m => m.Id == FieldId);
                            if (FieldIndex > -1) {
                                var SectionId = formdata.FormSections[sectionIndex].Id;
                                if (SectionId > -1) {
                                    var FieldId = formdata.FormSections[sectionIndex].FormSectionInspectionField[InspectionIndex1].FormSectionInspectionStatus[0].FormSectionInspectionDataArray[FieldIndex].Id;
                                    formdata.FormSections[sectionIndex].FormSectionInspectionField[InspectionIndex1].FormSectionInspectionStatus[0].FormSectionInspectionDataArray.push({
                                        Id: FieldId,
                                        FieldCaption: "InspectionControlFieldRemove"
                                    });
                                }
                                formdata.FormSections[sectionIndex].FormSectionInspectionField[InspectionIndex1].FormSectionInspectionStatus[0].FormSectionInspectionDataArray.splice(FieldIndex, 1);
                            }
                        }
                    }
                }

                break;
            case 'F': var index = FInspectionInputTypeArray.findIndex(m => m.Id == FieldId);
                if (index > -1) {
                    FInspectionInputTypeArray.splice(index, 1);
                }
                else {
                    var InspectionIndex = InspectionInputTypeDataArray.findIndex(m => m.Id == InspectionControlId);
                    if (InspectionIndex > -1) {
                        var FieldIndex = InspectionInputTypeDataArray[InspectionIndex].FormSectionInspectionStatus[1].FormSectionInspectionDataArray.findIndex(m => m.Id == FieldId);
                        if (FieldIndex > -1) {
                            InspectionInputTypeDataArray[InspectionIndex].FormSectionInspectionStatus[1].FormSectionInspectionDataArray.splice(FieldIndex, 1);
                        }
                    }
                    else {
                        sectionIndex = formdata.FormSections.findIndex(m => m.Name == oldsectionname);
                        if (sectionIndex > -1) {
                            var InspectionIndex1 = formdata.FormSections[sectionIndex].FormSectionInspectionField.findIndex(m => m.Id == InspectionControlId);
                            var FieldIndex = formdata.FormSections[sectionIndex].FormSectionInspectionField[InspectionIndex1].FormSectionInspectionStatus[1].FormSectionInspectionDataArray.findIndex(m => m.Id == FieldId);
                            if (FieldIndex > -1) {
                                var SectionId = formdata.FormSections[sectionIndex].Id;
                                if (SectionId > -1) {
                                    var FieldId = formdata.FormSections[sectionIndex].FormSectionInspectionField[InspectionIndex1].FormSectionInspectionStatus[1].FormSectionInspectionDataArray[FieldIndex].Id;
                                    formdata.FormSections[sectionIndex].FormSectionInspectionField[InspectionIndex1].FormSectionInspectionStatus[1].FormSectionInspectionDataArray.push({
                                        Id: FieldId,
                                        FieldCaption: "InspectionControlFieldRemove"
                                    });
                                }
                                formdata.FormSections[sectionIndex].FormSectionInspectionField[InspectionIndex1].FormSectionInspectionStatus[1].FormSectionInspectionDataArray.splice(FieldIndex, 1);
                            }
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

        if (oldsectionname == "") {
            oldsectionname = $("#OldSectionNameEdit").val();
        }
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
                    $.each(InspectionInputTypeDataArray[InspectionIndex].FormSectionInspectionStatus[0].FormSectionInspectionDataArray, function (index) {
                        InspectionInputTypeDataArray[InspectionIndex].FormSectionInspectionStatus[0].FormSectionInspectionDataArray[index].IsFieldPrivate = isChecked;
                    });
                    InspectionInputTypeDataArray[InspectionIndex].FormSectionInspectionStatus[0].IsFieldPrivate = isChecked;
                }

                sectionIndex = formdata.FormSections.findIndex(m => m.Name == oldsectionname);
                if (sectionIndex > -1) {
                    var InspectionIndex = formdata.FormSections[sectionIndex].FormSectionInspectionField.findIndex(m => m.Id == InspectionControlId);
                    $.each(formdata.FormSections[sectionIndex].FormSectionInspectionField[InspectionIndex].FormSectionInspectionStatus[0].FormSectionInspectionDataArray, function (index) {
                        formdata.FormSections[sectionIndex].FormSectionInspectionField[InspectionIndex].FormSectionInspectionStatus[0].FormSectionInspectionDataArray[index].IsFieldPrivate = isChecked;
                    });
                    formdata.FormSections[sectionIndex].FormSectionInspectionField[InspectionIndex].FormSectionInspectionStatus[0].IsFieldPrivate = isChecked;
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
                    $.each(InspectionInputTypeDataArray[InspectionIndex].FormSectionInspectionStatus[1].FormSectionInspectionDataArray, function (index) {
                        InspectionInputTypeDataArray[InspectionIndex].FormSectionInspectionStatus[1].FormSectionInspectionDataArray[index].IsFieldPrivate = isChecked;
                    });
                    InspectionInputTypeDataArray[InspectionIndex].FormSectionInspectionStatus[1].IsFieldPrivate = isChecked;
                }

                sectionIndex = formdata.FormSections.findIndex(m => m.Name == oldsectionname);
                if (sectionIndex > -1) {
                    var InspectionIndex = formdata.FormSections[sectionIndex].FormSectionInspectionField.findIndex(m => m.Id == InspectionControlId);
                    $.each(formdata.FormSections[sectionIndex].FormSectionInspectionField[InspectionIndex].FormSectionInspectionStatus[1].FormSectionInspectionDataArray, function (index) {
                        formdata.FormSections[sectionIndex].FormSectionInspectionField[InspectionIndex].FormSectionInspectionStatus[1].FormSectionInspectionDataArray[index].IsFieldPrivate = isChecked;
                    });
                    formdata.FormSections[sectionIndex].FormSectionInspectionField[InspectionIndex].FormSectionInspectionStatus[1].IsFieldPrivate = isChecked;
                }
                break;
            default: break;
        }
    });


    $('.input_fields_container, .input_fields_container_Edit').on("click", ".remove_inspection_field", function (e) {
        e.preventDefault();
        debugger;
        $(this).parent().parent('div').remove();

        //var labelname = $(this).parent('div').children('#lblinspectioncontrolname').text();
        //var index = InspectionInputTypeDataArray.findIndex(m => m.Name == labelname);
        //if (index > -1)
        //    InspectionInputTypeDataArray.splice(index, 1);

        var InspectionControlRemoveId = $(this).parent().parent().attr('id');
        var index = InspectionInputTypeDataArray.findIndex(m => m.Id == InspectionControlRemoveId);
        if (index > -1) {
            InspectionInputTypeDataArray.splice(index, 1);
        }
        else {
            var oldsectionname = $("#OldSectionName").val();
            if (oldsectionname == "") {
                oldsectionname = $("#OldSectionNameEdit").val();

            }
            sectionIndex = formdata.FormSections.findIndex(m => m.Name == oldsectionname);
            var InspectionControlIndex = formdata.FormSections[sectionIndex].FormSectionInspectionField.findIndex(m => m.Id == InspectionControlRemoveId);
            if (InspectionControlIndex > -1)
                formdata.FormSections[sectionIndex].FormSectionInspectionField.splice(InspectionControlIndex, 1);
        }
    });

    $('.input_fields_container, .input_fields_container_Edit').on("click", ".edit_inspection_field", function (e) {
        var oldsectionname = $("#OldSectionName").val();
        if (oldsectionname == "") {
            oldsectionname = $("#OldSectionNameEdit").val();

        }
        debugger;
        InspectionControlId = $(this).parent().parent().attr('Id');
        $("#ddlInspectionStatus").val("Select");
        $("#addinspectiontextbox, #addinspectiondropdownlist, #addinspectioncheckbox, #addinspectionradiobutton").addClass("pointernone");
        var InspectionControlName = $(this).parent().parent().find("#lblinspectioncontrolname").text();

        var dvPparent = $(this).parent().parent().find('#dvPparent').html();
        if (dvPparent != "" && dvPparent != undefined) {
            $('.Inspection_Control_container #dvPparent').html(dvPparent).find(".edit_inspection_field_controls,.remove_inspection_field_controls,#lblPAllPrivateField").css("display", "inline");
        }
        else {
            $('.Inspection_Control_container #dvPparent').html("");
        }


        var dvFparent = $(this).parent().parent().find('#dvFparent').html();
        if (dvFparent != "" && dvFparent != undefined) {
            $('.Inspection_Control_container #dvFparent').html(dvFparent).find(".edit_inspection_field_controls,.remove_inspection_field_controls,#lblFAllPrivateField").css("display", "inline");
        }
        else {
            $('.Inspection_Control_container #dvFparent').html("");
        }

        $("#ddlCodeStandards").multiselect('deselectAll', false);
        $('#ddlCodeStandards').multiselect('updateButtonText');
        var componentsname = $(this).parent().parent().find("#lblCodeStandardsValue").text();
        if (componentsname != "null") {
            var componentarray = componentsname.split(",");
            $.each(componentarray, function (index, text) {
                debugger;
                $("#ddlCodeStandards").multiselect('select', text);
            });

        }

        var metainfo = $(this).parent().parent().find("#hdnIsMetaInfo").val() == "true" ? true : false;
        $("#chkIsMetaInfo").prop("checked", metainfo);
        $('.Inspection_Control_container #dvPparent,.Inspection_Control_container #dvFparent').removeClass("active");
        $('.Inspection_Control_container').find('.inspection_pointer').removeClass('inspection_pointer');
        $(".Inspection_Control_container #dvP,.Inspection_Control_container #dvF").sortable({ scroll: true, scrollSensitivity: 100, scrollSpeed: 70, tolerance: "pointer", cursor: "move" });
        $("#IsInspectionControlForEdit").val(true);
        $("#OldInspectionControlName,#InspectionControlId").val(InspectionControlName);
        $("#addInspection").modal('show');
    });


    $('#addinspectiontextbox').click(function (e) {
        e.preventDefault();
        //TextBoxCaptionInput();
        if (TextBoxCaptionInput()) {
            var sectionnameforid = $('#sectionid').val();
            var currentSelectedVal = $("#ddlInspectionStatus").val();
            var dvToRender = GetDivId(currentSelectedVal);
            var Id = sectionfieldidcreation;
            sectionfieldidcreation = sectionfieldidcreation - 1;
            GetSetJsonInspectionInputTypeData('TextBox', TextboxCaption, currentSelectedVal, Id);
            $(".Inspection_Control_container #" + dvToRender).append('<div class="col-sm-3" id="' + Id + '" style="display:inline-block;">' +
                '<div class="form-group"><label>' + TextboxCaption + '</label >' +
                '<input class="form-control" type="text" name="' + sectionnameforid + "_" + TextboxCaption + '"/></div>' +
                '<label class="inspection_pointeraction"><input checked class= "check_private" type = "checkbox" name="Private Field"> Private Field</label>' +
                //'<label> <input class= "check_NA" type = "checkbox" name="NA Field"> NA </label>' +
                '<a href="#" class="edit_inspection_field_controls" style="margin-left: 10px;")>Edit</a>' +
                '<a href="#" class="remove_inspection_field_controls" style="margin-left:10px;">Remove</a></div>'); //add input field
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
        //else if (selectedvalue == "U") {
        //    $('.Inspection_Control_container #dvUparent').addClass("active");
        //    $('.Inspection_Control_container #dvPparent, .Inspection_Control_container #dvVparent , .Inspection_Control_container #dvRRparent').removeClass("active");
        //}
        else if (selectedvalue == "F") {
            $('.Inspection_Control_container #dvFparent').addClass("active");
            $('.Inspection_Control_container #dvPparent').removeClass("active");
        }
        //else if (selectedvalue == "RR") {
        //    $('.Inspection_Control_container #dvRRparent').addClass("active");
        //    $('.Inspection_Control_container #dvPparent, .Inspection_Control_container #dvFparent').removeClass("active");
        //}
        $("#spanInspectionControlStatusError").css("display", "none");
        $("#addinspectiontextbox, #addinspectiondropdownlist, #addinspectioncheckbox, #addinspectionradiobutton").removeClass("pointernone");
    });

    $('#AddInspectionControl').click(function () {

        //if (!isSpellCheckCorrect) {
        //    ValidateInput();
        //}
        debugger;
        var oldInspectionName = $("#OldInspectionControlName").val();
        var oldsectionname = $("#OldSectionName").val();
        if (oldsectionname == "") {
            oldsectionname = $("#OldSectionNameEdit").val();
        }
        var IsInspectionControlForEdit = $("#IsInspectionControlForEdit").val();

        var inspectionName = $('#InspectionControlId').val();
        var inspectionStatus = $('#ddlInspectionStatus').val();
        var codestandard = $("#ddlCodeStandards").val();
        var isMetaInfo = $("#chkIsMetaInfo").prop("checked");
        var isMetaInfoText = "No";
        if (isMetaInfo)
            isMetaInfoText = "Yes";

        if (codestandard != null) {
            codestandard = codestandard.toString();
        }
        debugger;
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
                    var FieldIndex = InspectionInputTypeDataArray[InspectionIndex].FormSectionInspectionStatus[0].FormSectionInspectionDataArray.findIndex(m => m.Id == PSortedOrder[i]);
                    InspectionInputTypeDataArray[InspectionIndex].FormSectionInspectionStatus[0].FormSectionInspectionDataArray[FieldIndex].FieldSequence = i + 1;
                }
                else {
                    sectionIndex = formdata.FormSections.findIndex(m => m.Name == oldsectionname);
                    if (sectionIndex > -1) {
                        var InspectionIndex = formdata.FormSections[sectionIndex].FormSectionInspectionField.findIndex(m => m.Id == InspectionControlId);
                        var FieldIndex = formdata.FormSections[sectionIndex].FormSectionInspectionField[InspectionIndex].FormSectionInspectionStatus[0].FormSectionInspectionDataArray.findIndex(m => m.Id == PSortedOrder[i]);
                        formdata.FormSections[sectionIndex].FormSectionInspectionField[InspectionIndex].FormSectionInspectionStatus[0].FormSectionInspectionDataArray[FieldIndex].FieldSequence = i + 1;
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
                    var FieldIndex = InspectionInputTypeDataArray[InspectionIndex].FormSectionInspectionStatus[1].FormSectionInspectionDataArray.findIndex(m => m.Id == FSortedOrder[i]);
                    InspectionInputTypeDataArray[InspectionIndex].FormSectionInspectionStatus[1].FormSectionInspectionDataArray[FieldIndex].FieldSequence = i + 1;
                }
                else {
                    sectionIndex = formdata.FormSections.findIndex(m => m.Name == oldsectionname);
                    if (sectionIndex > -1) {
                        var InspectionIndex = formdata.FormSections[sectionIndex].FormSectionInspectionField.findIndex(m => m.Id == InspectionControlId);
                        var FieldIndex = formdata.FormSections[sectionIndex].FormSectionInspectionField[InspectionIndex].FormSectionInspectionStatus[1].FormSectionInspectionDataArray.findIndex(m => m.Id == FSortedOrder[i]);
                        formdata.FormSections[sectionIndex].FormSectionInspectionField[InspectionIndex].FormSectionInspectionStatus[1].FormSectionInspectionDataArray[FieldIndex].FieldSequence = i + 1;
                    }
                }
            }
        }
        debugger;
        var codestandardtext = $.map($("#ddlCodeStandards option:selected"), function (e, i) {
            return $(e).text()
        });
        codestandardtext = codestandardtext.join(", ");
        if (codestandardtext == "")
            codestandardtext = "None";
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
        $(".Inspection_Control_container .edit_inspection_field_controls,.Inspection_Control_container .remove_inspection_field_controls," +
            ".Inspection_Control_container #lblPAllPrivateField,.Inspection_Control_container #lblFAllPrivateField").css("display", "none");

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

        //$('.Inspection_Control_container').find('.check_private').addClass('pointer');
        $('.Inspection_Control_container').find('.inspection_pointeraction').addClass('inspection_pointer');
        var htmlpart = $('.Inspection_Control_container').html();
        var Inspectionhtmlpart = $('#dvInspectionControlRadio').html();

        if (IsInspectionControlForEdit == "true") {
            var InspectionIndex = InspectionInputTypeDataArray.findIndex(m => m.Id == InspectionControlId);
            if (InspectionIndex > -1) {
                InspectionInputTypeDataArray[InspectionIndex].Name = inspectionName;
                InspectionInputTypeDataArray[InspectionIndex].CodeStandardId = codestandard;
                InspectionInputTypeDataArray[InspectionIndex].IsMetaInfoRequired = isMetaInfo;
            }
            else {
                sectionIndex = formdata.FormSections.findIndex(m => m.Name == oldsectionname);
                var InspectionIndex1 = formdata.FormSections[sectionIndex].FormSectionInspectionField.findIndex(m => m.Id == InspectionControlId);
                if (sectionIndex > -1) {
                    formdata.FormSections[sectionIndex].FormSectionInspectionField[InspectionIndex1].Name = inspectionName;
                    formdata.FormSections[sectionIndex].FormSectionInspectionField[InspectionIndex1].CodeStandardId = codestandard;
                    formdata.FormSections[sectionIndex].FormSectionInspectionField[InspectionIndex1].IsMetaInfoRequired = isMetaInfo;
                }
            }

            if (PInspectionInputTypeArray.length > 0) {
                if (InspectionInputTypeDataArray.length > 0) {
                    $.each(PInspectionInputTypeArray, function (index) {
                        InspectionInputTypeDataArray[InspectionIndex].FormSectionInspectionStatus[0].FormSectionInspectionDataArray.push(PInspectionInputTypeArray[index]);
                    });
                }
                else {
                    sectionIndex = formdata.FormSections.findIndex(m => m.Name == oldsectionname);
                    var InspectionIndex1 = formdata.FormSections[sectionIndex].FormSectionInspectionField.findIndex(m => m.Id == InspectionControlId);
                    if (sectionIndex > -1) {
                        $.each(PInspectionInputTypeArray, function (index) {
                            formdata.FormSections[sectionIndex].FormSectionInspectionField[InspectionIndex1].FormSectionInspectionStatus[0].FormSectionInspectionDataArray.push(PInspectionInputTypeArray[index]);
                        });
                    }

                }
            }

            if (FInspectionInputTypeArray.length > 0) {
                if (InspectionInputTypeDataArray.length > 0) {
                    $.each(FInspectionInputTypeArray, function (index) {
                        InspectionInputTypeDataArray[InspectionIndex].FormSectionInspectionStatus[1].FormSectionInspectionDataArray.push(FInspectionInputTypeArray[index]);
                    });
                }
                else {
                    sectionIndex = formdata.FormSections.findIndex(m => m.Name == oldsectionname);
                    var InspectionIndex1 = formdata.FormSections[sectionIndex].FormSectionInspectionField.findIndex(m => m.Id == InspectionControlId);
                    if (sectionIndex > -1) {
                        $.each(FInspectionInputTypeArray, function (index) {
                            formdata.FormSections[sectionIndex].FormSectionInspectionField[InspectionIndex1].FormSectionInspectionStatus[1].FormSectionInspectionDataArray.push(FInspectionInputTypeArray[index]);
                        });
                    }

                }
            }

            $(".input_fields_container div[id='" + InspectionControlId + "'],.input_fields_container_Edit  div[id='" + InspectionControlId + "']").html("<div class='col-md-12' style='background:#aaa;padding-top:6px;margin-bottom:8px;'><label>Inspection Control Name :</label><label id='lblinspectioncontrolname'>" + inspectionName + "</label>" +
                "<a href='#' class='edit_inspection_field' style='margin-left:10px;'>Edit</a>" +
                "<a href='#' class='remove_inspection_field' style='margin-left:10px;'>Remove</a></div> <div class='col-md-12'>" +
                "<label>Code Standards :  </label><label id='lblCodeStandardsName'>" + codestandardtext +
                "</label><label id='lblCodeStandardsValue' style='display:none'>" + codestandard + "</label><br>" +
                "<label>GP Info :  </label><label id='lblIsMetaInfo'>" + isMetaInfoText + "</label><br>" +
                "<input type='hidden' id='hdnIsMetaInfo' value=" + isMetaInfo + ">" +
                Inspectionhtmlpart + htmlpart + "</div>");
            $("#IsInspectionControlForEdit,#OldInspectionControlName").val("");
            InspectionControlId = "";
        }
        else {
            GetSetJsonInspectionControlData("P", PInspectionInputTypeArray, $("#chkPAllPrivateField").prop("checked"));
            GetSetJsonInspectionControlData("F,RR", FInspectionInputTypeArray, $("#chkFAllPrivateField").prop("checked"));
            //var inspectionnameforid = inspectionName.replace(/\s/g, "_");
            var Id = sectionfieldidcreation;
            GetSetJsonAllInspectionControls(inspectionName, InspectionControlDataArray, codestandard, FieldCounter, Id, isMetaInfo);
            //FieldCounter = FieldCounter + 1;
            sectionfieldidcreation = sectionfieldidcreation - 1;
            $('.input_fields_container , .input_fields_container_Edit').append("<div id='" + Id + "' style='border:1px solid #ddd; margin-bottom:10px; margin-top:10px;'><div class='col-md-12' style='background:#aaa;padding-top:6px;margin-bottom:8px;'><label>Inspection Control Name :</label><label id='lblinspectioncontrolname'>" + inspectionName + "</label>" +
                "<a href='#' class='edit_inspection_field' style='margin-left:10px;'>Edit</a>" +
                "<a href='#' class='remove_inspection_field' style='margin-left:10px;'>Remove</a></div><div class='col-md-12'>" +
                "<label>Code Standards : </label><label id='lblCodeStandardsName'>" + codestandardtext +
                "</label><label id='lblCodeStandardsValue' style='display:none'>" + codestandard + "</label><br>" +
                "<label>GP Info :  </label><label id='lblIsMetaInfo'>" + isMetaInfoText + "</label><br>" +
                "<input type='hidden' id='hdnIsMetaInfo' value=" + isMetaInfo + ">" +
                Inspectionhtmlpart + htmlpart + "</div></div>");
        }


        ClearInspectionControls();
        $('.Inspection_Control_container #dvPparent,' +
            '.Inspection_Control_container #dvFparent,.Inspection_Control_container #dvRRparent').removeClass().addClass("inspectioncontent");

    });

    //Enable the Section Controls and hide the errors when Section Name is entered
    $("#sectionid").keyup(function () {
        if ($(this).val() != '') {
            $("#addtextbox, #adddropdownlist, #addcheckbox, #addradiobutton , #addinspectioncontrol, #addmultilevel").removeClass("pointernone");
            $("#dvSectionIdError").css("display", "none");
        }
        else {
            $("#addtextbox, #adddropdownlist, #addcheckbox, #addradiobutton , #addinspectioncontrol, #addmultilevel").addClass("pointernone");
            $("#dvSectionIdError").css("display", "block");
        }
    });

    $("#sectionidEdit").keyup(function () {
        if ($(this).val() != '') {
            $("#addtextbox, #adddropdownlist, #addcheckbox, #addradiobutton , #addinspectioncontrol, #addmultilevel").removeClass("pointernone");
            $("#dvSectionIdEditError").css("display", "none");

        }
        else {
            $("#addtextbox, #adddropdownlist, #addcheckbox, #addradiobutton , #addinspectioncontrol, #addmultilevel").addClass("pointernone");
            $("#dvSectionIdEditError").css("display", "block");
        }
    });

    //MultiLevel
    $("#addmultilevel,#addmultilevel1,#addmultilevel2").click(function () {
        multiLevelObject = {};
        debugger;
        var levelName = $(this).attr('name');
        $("#spanChildNodeNumberError,#spanChildNodeNamesError").css("display", "none");
        switch (levelName) {
            case 'Multilevel1': multiLevelObject1 = {};
                levelPosition = "Level1";
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
                var Id = sectionfieldidcreation;
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
                sectionfieldidcreation = sectionfieldidcreation - 1;
            });
        }
        else if (levelPosition == "Level2") {
            $("#ddlMultilevelAnswer2").removeAttr('disabled');
            //var questionLevel1 = $("#txtMultilevelQuestion1").val();
            $.each(optionDescriptionArray, function (index, value) {
                var Id = sectionfieldidcreation;
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
                sectionfieldidcreation = sectionfieldidcreation - 1;
            });
        }
        else if (levelPosition == "Level3") {
            $("#ddlMultilevelAnswer3").removeAttr('disabled');
            //var questionLevel1 = $("#txtMultilevelQuestion1").val();
            $.each(optionDescriptionArray, function (index, value) {
                var Id = sectionfieldidcreation;
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
                sectionfieldidcreation = sectionfieldidcreation - 1;
            });
        }
    });

    //$('.input_fields_container,.input_fields_container_Edit').on("click", ".remove_multilevel_field_1", function (e) {
    //    e.preventDefault();
    //    $(this).parent().parent().remove();

    //    var labelname = $(this).parent().parent().find('#lblMultilevelName').text();
    //    var index = parentMultiLevelArray.findIndex(m => m.Name == labelname);
    //    if (index > -1)
    //        parentMultiLevelArray.splice(index, 1);
    //});

    $('.input_fields_container,.input_fields_container_Edit').on("change", ".check_private_multilevel", function (e) {
        e.preventDefault();
        var labelname = $(this).parent().parent().find('#lblMultilevelName').text();
        var index = parentMultiLevelArray.findIndex(m => m.Name == labelname);
        if ($(this).prop("checked") == true && index > -1) {
            parentMultiLevelArray[index].IsFieldPrivate = true;
            $(this).attr("checked", "checked");
        }
        else {
            parentMultiLevelArray[index].IsFieldPrivate = false;
            $(this).removeAttr("checked", "checked");

        }
    });

    $('.input_fields_container, .input_fields_container_Edit').on("click", ".edit_multilevel_field_1,.remove_multilevel_field_1", function (e) {
        debugger;
        var id = $(this).parent().parent().attr('Id');
        var className = $(this).attr('class');
        //var oldsectionname = $("#OldSectionName").val();
        //if (oldsectionname == "") {
        //    oldsectionname = $("#OldSectionNameEdit").val();

        //}
        var sectionId = $("#OldSectionId").val();
        var question = "";
        var options = [];
        var ParentMultilevelId = "";
        var questionindex = parentMultiLevelArray.findIndex(m => m.Id == id);
        if (questionindex > -1) {
            if (className == "edit_multilevel_field_1") {
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
            else if (className == "remove_multilevel_field_1") {
                parentMultiLevelArray.MultiLevelArray.splice(questionindex, 1);
            }
           
        }
        else {
            sectionIndex = formdata.FormSections.findIndex(m => m.Id == sectionId);
            if (sectionIndex > -1) {
                questionindex = formdata.FormSections[sectionIndex].FormSectionMultilevelField.findIndex(m => m.Id == id);
                if (questionindex > -1) {
                    ParentMultilevelId = formdata.FormSections[sectionIndex].FormSectionMultilevelField[questionindex].Id;

                    if (className == "edit_multilevel_field_1") {
                        question = formdata.FormSections[sectionIndex].FormSectionMultilevelField[questionindex].Question;
                        $.each(formdata.FormSections[sectionIndex].FormSectionMultilevelField[questionindex].Answers, function (index) {
                            debugger;
                            options.push({
                                Text: formdata.FormSections[sectionIndex].FormSectionMultilevelField[questionindex].Answers[index].FieldCaption,
                                Value: formdata.FormSections[sectionIndex].FormSectionMultilevelField[questionindex].Answers[index].Id
                            });
                        });
                    }
                    else if (className == "remove_multilevel_field_1") {
                        formdata.FormSections[sectionIndex].FormSectionMultilevelField.splice(questionindex, 1);
                        if (ParentMultilevelId > 0) {
                            GetSetJsonAllMultilevelRemove(ParentMultilevelId, sectionIndex);
                        }
                    }
                }
            }
        }

        if (className == "edit_multilevel_field_1") {
            $("#txtMultilevelQuestion1").val(question);
            $("#ddlMultilevelAnswer1").empty().append('<option value="" selected disabled>Select</option>').removeAttr("disabled");

            var htmlpart = $(this).parent().parent().find('.final_multilevel_container_1').html();

            $("#hdnParentMultilevelId1").val(ParentMultilevelId);
            $(".multilevel_fields_container_1").html(htmlpart);

            var divIds = $.map($(".multilevel_fields_container_1").children("div[id]"), function (e, i) {
                return $(e).attr('id');
            });

            $.each(divIds, function (index) {
                $(".multilevel_fields_container_1 #" + divIds[index]).sortable({ scroll: true, scrollSensitivity: 100, scrollSpeed: 70, tolerance: "pointer", cursor: "move" });
            });

            $.each(options, function (index) {
                $("#ddlMultilevelAnswer1").append("<option value=" + options[index].Value + ">" + options[index].Text + "</option>");
                $(".multilevel_fields_container_1 div[id=Content_" + options[index].Value + "]").css("display", "none");
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
        }
        else if (className == "remove_multilevel_field_1") {
            $(this).parent().parent().remove();
        }
    });

});

function GetDivId(currentCtrlName) {
    if (currentCtrlName == "P") return "dvP";
    //else if (currentCtrlName == "U") return "dvU";
    else if (currentCtrlName == "F") return "dvF";
    //else if (currentCtrlName == "RR") return "dvRR";
}

function EditSection(ctrlId, sectionId, sectionName) {
    debugger;
    var index = formdata.FormSections.findIndex(m => m.Id == sectionId);
    var SectionNameforEdit = formdata.FormSections[index].Name;
    var quantitymedian = formdata.FormSections[index].QuantityMedian;
    FieldCounter = formdata.FormSections[index].HighestFieldSequence + 1;
    $("#lblSectionIdforEdit").text(sectionId);
    $("#OldSectionId").val(sectionId);
    if (quantitymedian) {
        $("#QuantityMedianCheckBoxEdit").prop("checked", true);
    }
    else {
        $("#QuantityMedianCheckBoxEdit").prop("checked", false);
    }
    $("#sectionidEdit").val(SectionNameforEdit);
    $("#OldSectionNameEdit").val(SectionNameforEdit);

    var divId = "#" + sectionId + "_htmlcontent";
    var sectionhtml = $(divId).html(); /* $(ctrlId).parents('table').children('tbody').find('div').html();*/
    $('.input_fields_container_Edit').html(sectionhtml);
    $('.input_fields_container_Edit').find('.field_pointer').removeClass('field_pointer');

    //Add Pointer to private fields and inspection controls of multilevel control.
    $('.input_fields_container_Edit .final_multilevel_container_1,' +
        '.input_fields_container_Edit .final_multilevel_container_2,.input_fields_container_Edit .final_multilevel_container_3').find('.field_pointeraction').addClass('field_pointer');

    $('.input_fields_container_Edit .remove_field_edit , .input_fields_container_Edit .edit_section_field, .input_fields_container_Edit .edit_inspection_field,' +
        '.input_fields_container_Edit .remove_field_new, .input_fields_container_Edit .remove_inspection_field,' +
        '.input_fields_container_Edit .edit_multilevel_field_1,.input_fields_container_Edit .remove_multilevel_field_1').css("display", "inline");
}

function RemoveSection(ctrlId, sectionId, sectionName) {
    debugger;
    //var divId = "#section_" + sectionId
    $("#" + sectionId).remove();
    // 1. remove html
    //$(ctrlId).parents('table').remove();
    // 2. remove from array
    var index = formdata.FormSections.findIndex(m => m.Id == sectionId);
    if (index > -1) {
        formdata.FormSections.splice(index, 1);
        //   GetSetJsonAllInspectionControlsRemove(sectionId, "SectionRemove");
        formdata.FormSections.push({ Id: sectionId, Name: "SectionRemove" });
    }
}

function RemoveSectionField(ctrlId, sectionId, sectionName, fieldId, fieldCaption) {
    // 1. remove html
    $(ctrlId).parent('div').remove();
    // 2. remove from array
    var index = formdata.FormSections.findIndex(m => m.Name == sectionName);
    if (index > -1) {
        var sectionFieldIndex = formdata.FormSections[index].FormSectionFields.findIndex(m => m.Id == fieldId);
        if (sectionFieldIndex > -1) {
            formdata.FormSections[index].FormSectionFields.splice(sectionFieldIndex, 1);
            formSectionLength = formSectionLength - 1;
            // GetSetJsonAllInspectionControlsRemove(fieldId, "FieldRemove");
            formdata.FormSections[index].FormSectionFields.push({ Id: fieldId, FieldCaption: "FieldRemove" });

        }
    }
}

function RemoveInspectionControl(ctrlId, sectionId, sectionName, inspectionId, inspectionCaption) {
    debugger;
    $(ctrlId).parent().parents('div').first().remove();
    var index = formdata.FormSections.findIndex(m => m.Id == sectionId);
    if (index > -1) {
        //var sectionFieldIndex = formdata.FormSections[index].FormSectionInspectionField.findIndex(m => m.Id == inspectionId);
        //if (sectionFieldIndex > -1) {
        //formdata.FormSections[index].FormSectionInspectionField.splice(sectionFieldIndex, 1);
        var inspectionarrayindex = formdata.FormSections[index].FormSectionInspectionField.findIndex(m => m.Id == inspectionId);
        if (inspectionarrayindex > -1) {
            formdata.FormSections[index].FormSectionInspectionField.splice(inspectionarrayindex, 1);
            GetSetJsonAllInspectionControlsRemove(inspectionId, "InspectionControlRemove");
        }
        //}

    }
}

function RemoveMultilevelControl(ctrlId, sectionId, multilevelid) {
    $(ctrlId).parent().parent().parent().remove();
    var index = formdata.FormSections.findIndex(m => m.Id == sectionId);
    if (index > -1) {
        //var sectionFieldIndex = formdata.FormSections[index].FormSectionFields.findIndex(m => m.Id == multilevelid);
        //if (sectionFieldIndex > -1) {
        //formdata.FormSections[index].FormSectionFields.splice(sectionFieldIndex, 1);
        var multilevelarrayindex = formdata.FormSections[index].FormSectionMultilevelField.findIndex(m => m.Id == multilevelid);
        if (multilevelarrayindex > -1) {
            formdata.FormSections[index].FormSectionMultilevelField.splice(multilevelarrayindex, 1);
            GetSetJsonAllMultilevelRemove(multilevelid, "MultilevelRemove");
        }
        //}
    }
}

function EditSectionField(ctrlId, sectionId, secfieldId, secFieldFieldInputType) {
    sectionIndex = formdata.FormSections.findIndex(m => m.Id == sectionId);
    var sectionfieldindex = formdata.FormSections[sectionIndex].FormSectionFields.findIndex(m => m.Id == secfieldId);
    if (secFieldFieldInputType.toLowerCase() == "textbox") {
        //TextBoxCaptionInput();
        if (TextBoxCaptionInput()) {
            var oldcaption = formdata.FormSections[sectionIndex].FormSectionFields[sectionfieldindex].FieldCaption;
            if (sectionfieldindex > -1) {
                formdata.FormSections[sectionIndex].FormSectionFields[sectionfieldindex].FieldCaption = TextboxCaption;
                $(".input_fields_container_Edit").find('label:contains(' + oldcaption + ')').html(TextboxCaption);
            }
        }
    }
    else {
        $("#lblSectionFieldIdforEdit").text(secfieldId);
        //  $("#lblSectionIdforEdit").text(sectionId);
        $("#lblControlCaptionId").text(secFieldFieldInputType);


        var secFieldFieldCaption = formdata.FormSections[sectionIndex].FormSectionFields[sectionfieldindex].FieldCaption;
        var secFieldFieldInputOptions = formdata.FormSections[sectionIndex].FormSectionFields[sectionfieldindex].FieldInputOptions
        $("#ControlCaptionId").val(secFieldFieldCaption);
        $("#txtCaptionOption").val(secFieldFieldInputOptions);

    }


}

function EditPrivateField(ctrlId, sectionId, sectionfieldId) {
    sectionIndex = formdata.FormSections.findIndex(m => m.Id == sectionId);
    var sectionfieldindex = formdata.FormSections[sectionIndex].FormSectionFields.findIndex(m => m.Id == sectionfieldId);
    if ($(ctrlId).prop("checked") == true) {
        formdata.FormSections[sectionIndex].FormSectionFields[sectionfieldindex].IsFieldPrivate = true;
    }
    else {
        formdata.FormSections[sectionIndex].FormSectionFields[sectionfieldindex].IsFieldPrivate = false;
    }
}

//Takes Input for TextBox Caption
function TextBoxCaptionInput() {
    var person = prompt("Please enter label:", "");
    if (person == null || person == "") {
        TextboxCaption = "";
        return false;
    }
    else {
        TextboxCaption = person;
        TextboxCaption = TextboxCaption.replace(/\n/g, '').trim();
        if (VerifyUserInput(person)) {
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

function ClearControls() {
    $('.input_fields_container').empty();
    $("#sectionid").val("");
    FormSectionFieldDataModel = [];
    $("#spanSectionListError").css("display", "none");
    $("#addtextbox, #adddropdownlist, #addcheckbox, #addradiobutton ,#addinspectioncontrol, #addmultilevel").addClass("pointernone");
    $('#QuantityMedianCheckBox').prop("checked", false);
    FieldCounter = 1;
    $("#OldSectionNameEdit").val("");
    $("#ddlSectionList").empty().append($('<option></option>').val("").html("--Select--"));
    if (formdata.FormSections.length >= 1) {
        $("#ddlSectionList").empty().append($('<option></option>').val("").html("--Select--")).append($('<option></option>').val("Top").html("Top Position"));
        $.each(formdata.FormSections, function () {
            $("#ddlSectionList").append($('<option></option>').val(this.Id).html(this.Name));
        });
    }

}

function ClearControlsforEdit() {
    $('.input_fields_container_Edit').empty();
    $("#sectionidEdit").val("");
    FormSectionFieldDataModel = [];
    $("#QuantityMedianCheckBoxEdit").prop("checked", false);
    FieldCounter = 1;
}

function ClearInspectionControls() {
    InspectionControlDataArray = [];
    PInspectionInputTypeArray = [];
    //UInspectionInputTypeArray = [];
    FInspectionInputTypeArray = [];
    //RRInspectionInputTypeArray = [];
    $('.Inspection_Control_container #dvPparent,' +
        '.Inspection_Control_container #dvFparent').removeClass().addClass("inspectioncontent");
}

function ClearControlOptions() {
    $("#ControlCaptionId,#ControlCaptionIdEdit").val("");
    $("#txtCaptionOption,#txtCaptionOptionEdit").val("");
    ControlOptionArray = [];
    $('#spanInputFieldError, #spanControlCaptionIdError,#spanCaptionOptionError,' +
        '#spanInputFieldEditError,#spanControlCaptionIdEditError,#spanCaptionOptionEditError ').css("display", "none");
}

function GetSetJsonInputType(type, caption, fieldsequence, id, option = null, isfieldprivate = true, isfieldna = null) {
    var inputTypeData = {
        //Id: 0,
        Id: id,
        FormSectionId: sectionfieldidcreation,
        FieldSequence: fieldsequence,
        ParentId: null,
        FieldCaption: caption,
        FieldInputType: type,
        FieldInputOptions: option,
        IsFieldPrivate: isfieldprivate,
        IsFieldNa: isfieldna
    };
    FormSectionFieldDataModel.push(inputTypeData)
}

function GetSetJsonSectionData(Id, name, formsectionfielddatamodel, quantitymedian, inspectioninputtypedataarray, multileveltypearray) {

    var SectionData = {
        Id: Id,
        FormId: formdata.Id,
        Name: name,
        SequenceNumber: formSectionLength + 1,
        QuantityMedian: quantitymedian,
        FormSectionFields: formsectionfielddatamodel,
        FormSectionInspectionField: inspectioninputtypedataarray,
        FormSectionMultilevelField: multileveltypearray
    }
    formdata.FormSections.push(SectionData);

}

function GetSetJsonInputTypeforNew(sectionid, type, caption, fieldsequence, option = null, isfieldprivate = true, isfieldna = null) {
    var inputTypeData = {
        Id: sectionfieldidcreation,
        FormSectionId: sectionid,
        FieldSequence: fieldsequence,
        ParentId: null,
        FieldSequence: 0,
        FieldCaption: caption,
        FieldInputType: type,
        FieldInputOptions: option,
        IsFieldPrivate: isfieldprivate,
        IsFieldNa: isfieldna
    };
    var index = formdata.FormSections.findIndex(m => m.Id == sectionid);
    formdata.FormSections[index].FormSectionFields.push(inputTypeData);
    // sectionfieldidcreation = sectionfieldidcreation - 1;
    return sectionfieldidcreation;
}

//When User click on any controls in Inspection Control Section
function GetInputType(type, caption, option, id, isFieldPrivate = true, isFieldNa = null) {
    this.Id = id;
    this.FormSectionId = 0;
    this.ParentId = null;
    this.FieldSequence = 0;
    this.FieldCaption = caption;
    this.FieldInputType = type;
    this.FieldInputOptions = option;
    this.IsFieldPrivate = isFieldPrivate;
    this.IsFieldNa = isFieldNa;
    //this.InspectionControlArray = InspectionControlDataArray;
}

function GetSetJsonInspectionInputTypeData(type, caption, currentSelectedVal, id, option = null) {
    if (currentSelectedVal == "P") {
        var InspectionInputTypeData = new GetInputType(type, caption, option, id);
        PInspectionInputTypeArray.push(InspectionInputTypeData);
    }
    else if (currentSelectedVal == "F") {
        var InspectionInputTypeData = new GetInputType(type, caption, option, id);
        FInspectionInputTypeArray.push(InspectionInputTypeData);
    }
}

function GetInspectionInputTypeData(name, InspectionInputTypeArray, isfieldprivate) {
    this.Name = name;
    this.FormSectionInspectionDataArray = InspectionInputTypeArray;
    this.IsFieldPrivate = isfieldprivate;
}

function GetSetJsonInspectionControlData(name, InspectionInputTypeArray, isfieldprivate) {
    var InspectionControlData = new GetInspectionInputTypeData(name, InspectionInputTypeArray, isfieldprivate);
    InspectionControlDataArray.push(InspectionControlData);
}

//When User Click on Save Button in Inspection Control Section
function GetAllInspectionControls(name, InspectionControlDataArray, codestandard, fieldsequence, id, isMetaInfo) {
    this.Name = name;
    this.FormSectionInspectionStatus = InspectionControlDataArray;
    this.CodeStandardId = codestandard;
    this.FieldSequence = fieldsequence;
    this.Id = id;
    this.IsMetaInfoRequired = isMetaInfo;
}

function GetSetJsonAllInspectionControls(name, InspectionControlDataArray, codestandard, fieldsequence, id, isMetaInfo, fromMultilevel = false) {
    var allInspectionControls = new GetAllInspectionControls(name, InspectionControlDataArray, codestandard, fieldsequence, id, isMetaInfo);
    if (fromMultilevel) {
        MultilevelInspectionInputTypeDataArray.push(allInspectionControls);
    }
    else {
        InspectionInputTypeDataArray.push(allInspectionControls);
    }
}

function GetAllInspectionControlsRemove(id, name) {
    this.Id = id;
    this.Name = name;
    this.FormSectionInspectionStatus = [];
}

function GetSetJsonAllInspectionControlsRemove(id, name) {
    var allInspectionControls = new GetAllInspectionControlsRemove(id, name);
    InspectionInputTypeDataArray.push(allInspectionControls);
}

//function GetAllMultilevelRemove(id, name) {
//    this.Id = id;
//    this.Name = name;
//    this.Childs = [];
//}
function GetSetJsonAllMultilevelRemove(id, sectionIndex) {
    var deletionObject = {
        Id: id,
        Question: "multilevelremove",
        FieldSequence: 0,
        IsFieldPrivate: false,
        Answers: ""
    };
    formdata.FormSections[sectionIndex].FormSectionMultilevelField.push(deletionObject);
}

function PostFormControls() {
    var isModelValid = true;
    $("#dvSection .remove_field,#dvSection .remove_link,#dvSection .edit_link ,#dvSection .edit_field,#dvSection .edit_section_field ").css("display", "none");
    debugger;
    var sectionOrder = $('#dvSection').sortable("toArray");
    for (var i = 0; i < sectionOrder.length; i++) {
        sectionIndex = formdata.FormSections.findIndex(m => m.Id == sectionOrder[i]);
        if (sectionIndex > -1) {
            formdata.FormSections[sectionIndex].SequenceNumber = i + 1;
        }
    }

    $("#dvSection").find('.collapse').removeClass('collapse');
    var FormHtml = $("#dvSection").html();
    if (FormHtml.trim() == "") {
        $.confirm({
            title: "Error",
            content: "Atleast one section to be required to save the form",
            buttons: {
                okay: {
                    omg: 'Ok',
                    btnClass: 'btn-red',
                },
            }
        });
        return false;
        //$("#spanSectionInputError").css("display", "block");
        //return false;
    }
    //if (!isSpellCheckCorrect) {
    //    ValidateInput();
    //}
    showLoader();


    $.ajax({
        type: 'Post',
        url: '/Form/EditForm',
        data: { 'formdata': JSON.stringify(formdata), 'formhtml': FormHtml },
        success: function (data) {
            FormDataArray = [];
            $.confirm({
                title: data.result,
                content: data.message,
                buttons: {
                    okay: {
                        omg: 'Ok',
                        btnClass: 'btn-green',
                        action: function () {
                            hideLoader();
                            window.location.href = '/Form/GetFormDetails';
                        }
                    },
                }
            });

        },
        error: function (jqXhr, textStatus, errorThrown) {
            toastr.error(errorThrown.toString());
            hideLoader();
            window.location.href = '/Form/GetFormDetails';
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