// Start Loader
const Loader = (function () {
    function open() {
        document.onreadystatechange = function () {
            const state = document.readyState;

            if (state === 'interactive') {
                document.getElementById('main').style.visibility = "hidden";
                document.body.classList.toggle("body-noScroll");
            } else if (state === 'complete') {
                setTimeout(function () {
                    document.getElementById('load').style.visibility = "hidden";
                    document.getElementById('main').style.visibility = "visible";
                    document.body.classList.remove("body-noScroll");
                }, 1300);
            }
        };
    }

    return { run: open };
})();
Loader.run();
// !!End Loader


// Scroll.goTop("go-to-top");

// Note: Tooltips must be initialized with JavaScript to work. 
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
})
// !!End Tooltips

// Start Chart 
const ctx = document.getElementById('myChart').getContext('2d');
window.chartColors = {
    blue: 'rgba(138, 116, 249,1)',
    // blueLight: 'linear-gradient(180deg, rgba(138, 116, 249,1) 0%, rgba(138, 116, 249, 0.26) 47.92%, rgba(138, 116, 249, 0.00) 100%)',
};

var MONTHS = ['ديسمبر' , 'نوفمبر' , 'أكتوبر' , 'سبتمبر' , 'أغسطس' , 'يوليو' , 'يونيو' , 'مايو' , 'إبريل' , 'مارس' , 'فبراير' , 'يناير'];

// Create Gradient
const my_gradient = ctx.createLinearGradient(0, 0, 0, 170);
my_gradient.addColorStop(0, "#8A74F9");
my_gradient.addColorStop(1, "#8a74f942");

new Chart(ctx, {
    type: 'line', 
    data: {
        labels: MONTHS,
        datasets: [{
            label: '# of Votes',
            data: [2, 4, 3, 1, 2, 3, 0, 1, 4, 3, 2, 1],
            borderWidth: 2,
            borderColor: window.chartColors.blue,
            backgroundColor: my_gradient,
            fill: true,
            fillStyle : my_gradient,
            fillRect : "(20, 20, 150, 100)",
            lineTension: 0.4,        
            radius: 6 ,
            pointBackgroundColor:"transparent",
            pointBorderColor:"transparent",
            pointHoverBackgroundColor: window.chartColors.blue,
            pointHoverBorderColor: window.chartColors.blue,

            // segment: {
            //     background: my_gradient,
            // }
        }]
    },
    // tooltip: {
    //     usePointStyle: true,
    //     borderColor: window.chartColors.blue,
    // },
    tooltip: {
        borderRadius: 6,
        titleAlign : 'right',
        rtl : true,
        usePointStyle : true,
        textDirection : 'rtl',
        intersect: false,
        mode: 'index', 
        defaultFontFamily : "'NeoSansArabic'",
        font : "'NeoSansArabic'",
        backgroundColor: 'rgba(30, 27, 57,1)',
      },
    options: {
        rtl: true, 
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                display : false, 
            },
            x: {
                position: 'right' ,
                
                ticks: {
                    font: {
                      size: 12,
                      family : "'NeoSansArabic'",
                      color : "#9291A5",
                      rtl:true,
                      titleAlign : 'right',
                      position: 'right' 
                    }
                }, 
            }
        }, 
        plugins: {
            legend: {
                display : false, 
            },
            tooltip: {
                usePointStyle: true, 
                borderRadius: 6,
                titleAlign : 'right',
                rtl : true,
                textDirection : 'rtl',
                titleFont: {
                    size: 14,
                    family : "'NeoSansArabic'",
                    textDirection : 'rtl',
                    titleAlign : 'right',
                    rtl : true,
                  },
                  bodyFont: {
                    size: 12,
                    family : "'NeoSansArabic'",
                    textDirection : 'rtl',
                    titleAlign : 'right',
                    rtl : true,
                  },

                callbacks: {
                    labelColor: function(context) {
                        return {
                            borderColor: 'rgb(30, 27, 57)',
                            backgroundColor: 'rgb(30, 27, 57)',
                            borderWidth: 0,
                            borderDash: [2, 2],
                            borderRadius: 6,
                            titleAlign : 'right',
                            rtl : true,
                            usePointStyle : true,
                            textDirection : 'rtl',
                        };
                    },
                    labelTextColor: function(context) {
                        return '#8A74F9';
                    }
                }
            }
        },
    }
});

// !!End Chart

// Start Copy to clipboard
let copyText = document.querySelector(".copy_text");
copyText.querySelector(".copy_text-btn").addEventListener("click", function () {
    let input = copyText.querySelector(".copy_text-input");
    input.select();
    document.execCommand("copy");
    copyText.classList.add("active");
    window.getSelection().removeAllRanges();
    setTimeout(function () {
        copyText.classList.remove("active");
    }, 2500);
});

// !!End Copy to clipboard
// Start Data Table
new DataTable('#ticketsTable', {
    responsive: true,
    "bLengthChange": false, //thought this line could hide the LengthMenu 
    "bFilter": true,// show search input 
    "language": {
        "lengthMenu": "عرض _MENU_ records صفحة",
        "zeroRecords": "لا يوجد نتائج متاحة",
        "info": "عرض صفحة _PAGE_ من _PAGES_",
        "infoEmpty": "لا يوجد نتائج متاحة",
        "infoFiltered": "(النتيحة من _MAX_ المجموع)"
    },
    "ordering": true,
    "pageLength": 4,
    pagingType: 'full_numbers' ,
    autoWidth: false,
    columnDefs: [
        {
        orderable: false,
        targets: "no-sort",
        // render: function(data, type, row) {
        //     if ( type === 'display') {
        //       var renderedData = $.fn.dataTable.render.ellipsis(70)(data, type, row);            
        //       return myRenderedValue = renderedData;
        //     }
        //     return data;
        //   }
    }
]
,
"drawCallback": function ( settings ) {

    /*show pager if only necessary
    console.log(this.fnSettings());*/
    if (Math.ceil((this.fnSettings().fnRecordsDisplay()) / this.fnSettings()._iDisplayLength) > 1) {
        $('#ticketsTable_paginate').css("display", "flex");     
    } else {                
        $('#ticketsTable_paginate').css("display", "none");
    }

    }
});

$("#ticketsTable_filter").addClass("hidden"); // hidden search input

$("#tableSearchInput").on("input", function (e) {
    e.preventDefault();
    $('#ticketsTable').DataTable().search($(this).val()).draw();
});
// !!End Data Table

// Start Font Awesome
window.FontAwesomeConfig = {
    searchPseudoElements: true
}
// !!End Font Awesome

