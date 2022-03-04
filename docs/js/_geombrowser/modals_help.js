let initHelpModal1 = () => {
    let modal = document.getElementById('modalHelp1');
    let btn = document.getElementById("btn-help1");
    btn.onclick = function() {
        modal.style.display = "block";
    }
    $("#btn-modal-help1-close").click(function() {
        modal.style.display = "none";
    });
};

let openHelpModal1 = () => {
    $("#btn-help1").trigger("click");
};

initHelpModal1();

let initHelpModal2 = () => {
    let modal = document.getElementById('modalHelp2');
    let btn = document.getElementById("btn-help2");
    btn.onclick = function() {
        modal.style.display = "block";
    }
    $("#btn-modal-help2-close").click(function() {
        modal.style.display = "none";
    });
};

let openHelpModal2 = () => {
    $("#btn-help2").trigger("click");
};

initHelpModal2();