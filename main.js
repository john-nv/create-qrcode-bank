const QR_URL = "https://qr.sepay.vn/img?acc=8154461&bank=970416";
$("#qrImage").attr("src", QR_URL);

$(document).ready(function() {
    setupListeners();
    $('#dialog').modal('show');
});

function setupListeners() {
    $('#start').on('click', handleStartClick);
    $("#value_start").on("input", handleValueInputChange);
    $("#banking_amount, #banking_content").on("input", updateQRCode);
    $("#banking_amount").on("input", handleAmountInput);
    
    $("#banking_copy, #banking_id_copy, #banking_name_copy, #banking_content_copy, #banking_amount_copy").click(handleCopyClick);
}

function handleStartClick() {
    const value_input = $('#value_start').val();
    if (value_input.length > 0) {
        $('#dialog').modal('hide');
        $("#banking_amount").focus();
        updateQRCode();
    } else {
        alert("Please enter information");
    }
}

function handleValueInputChange() {
    const value = $('#value_start').val();
    if (value.length > 0) {
        $('#start').prop("disabled", false);
        $('#banking_content').val(value);
    } else {
        $('#start').prop("disabled", true);
    }
}

function handleAmountInput() {
    this.value = this.value.replace(/[^0-9]/g, '');
    updateQRCode();
}

function handleCopyClick() {
    const inputId = $(this).data('input-id');
    copyToClipboard(inputId);
}

function copyToClipboard(inputId) {
    const input = $("#" + inputId)[0];
    input.select();
    document.execCommand('copy');
    alert(`Đã sao chép ! \n\n${input.value}`);
}

function updateQRCode() {
    const amount = $("#banking_amount").val();
    const des = $("#banking_content").val();
    const newSrc = `${QR_URL}&amount=${amount}&des=${des}`;
    $("#qrImage").attr("src", newSrc);
}
