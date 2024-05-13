$(document).ready(function() {
    var calculatorContainer = $("<div>").addClass("calculator");
    var display = $("<input>").attr({type: "text", id: "display", readonly: true}).addClass("display");
    var buttonsContainer = $("<div>").addClass("buttons-container");
    
    var buttons = [
        {text: "AC", class: "button clear"},
        {text: "+/-", class: "button sign"},
        {text: "%", class: "button percent"},
        {text: "/", class: "button operator"},
        {text: "7", class: "button"},
        {text: "8", class: "button"},
        {text: "9", class: "button"},
        {text: "*", class: "button operator"},
        {text: "4", class: "button"},
        {text: "5", class: "button"},
        {text: "6", class: "button"},
        {text: "-", class: "button operator"},
        {text: "1", class: "button"},
        {text: "2", class: "button"},
        {text: "3", class: "button"},
        {text: "+", class: "button operator"},
        {text: "0", class: "button"},
        {text: ".", class: "button"},
        {text: "=", class: "button equal"},
    ];

    buttons.forEach(function(button) {
        var btn = $("<button>").text(button.text).addClass(button.class);
        buttonsContainer.append(btn);
    });

    calculatorContainer.append(display, buttonsContainer);
    $("body").append(calculatorContainer);

    $(".button").click(function() {
        var value = $(this).text();
        if (value === "=") {
            calculate();
        } else if (value === "AC") {
            clearDisplay();
        } else if (value === "+/-") {
            changeSign();
        } else if (value === "%") {
            calculatePercentage();
        } else {
            $("#display").val(function(index, val) {
                return val + value;
            });
        }
    });

    function calculate() {
        var expression = $("#display").val();
        var result = eval(expression);
        $("#display").val(result);
    }

    function clearDisplay() {
        $("#display").val("");
    }

    function changeSign() {
        var currentValue = $("#display").val();
        if (currentValue !== "") {
            if (currentValue.charAt(0) === "-") {
                $("#display").val(currentValue.slice(1));
            } else {
                $("#display").val("-" + currentValue);
            }
        }
    }

    function calculatePercentage() {
        var currentValue = $("#display").val();
        if (currentValue !== "") {
            var percentage = parseFloat(currentValue) / 100;
            $("#display").val(percentage);
        }
    }

    $(".calculator").css({
        "padding": "10px",
        "background-color": "#212121",
    });
    
    $(".display").css({
        "width": "97%",
        "height": "20%",
        "margin-bottom": "10px",
        "padding": "10px",
        "font-size": "36px",
        "text-align": "right",
        "border": "none",
        "background-color": "#424242",
        "color": "#ffffff"
    });
    
    $(".buttons-container").css({
        "display": "grid",
        "grid-template-columns": "repeat(4, 1fr)",
        "grid-gap": "10px"
    });
    
    $(".button").css({
        "width": "100%",
        "font-size": "32px",
        "border": "none",
        "border-radius": "10px",
        "background-color": "#616161",
        "color": "#ffffff",
        "cursor": "pointer"
    });
    
    $(".operator").css({
        "background-color": "#ff9500"
    });
    
    $(".equal").css({
        "background-color": "#4caf50"
    });
    
    $(".clear").css({
        "background-color": "#838383"
    });
    
    $(".sign").css({
        "background-color": "#838383"
    });
    
    $(".percent").css({
        "background-color": "#838383"
    });

    $(".button").hover(
        function() {
            $(this).css("background-color", "#444444");
        },
        function() {
            $(this).css("background-color", "#616161");
        }
    );

    $(".clear, .sign, .percent").hover(
        function() {
            $(this).css("background-color", "#555555");
        },
        function() {
            $(this).css("background-color", "#838383");
        }
    );

    $(".operator").hover(
        function() {
            $(this).css("background-color", "#d37b00");
        },
        function() {
            $(this).css("background-color", "#ff9500");
        }
    );

    $(".equal").hover(
        function() {
            $(this).css("background-color", "#3c883f");
        },
        function() {
            $(this).css("background-color", "#4caf50");
        }
    );
});
