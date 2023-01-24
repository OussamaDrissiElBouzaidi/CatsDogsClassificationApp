let myBody=document.querySelector('body')
let myHeader=document.querySelector('header')
let myChart=document.querySelector('chartBox')

function scrolling(){

    window.onscroll = function() {
        let currentScroll = document.documentElement.scrollTop;
  
        if (currentScroll > 0){
            myHeader.style.background='rgba(0,0, 0, 0.75)'
        }
        if(currentScroll == 0){
            myHeader.style.backgroundColor='transparent'
        }
        
    };
  }
  
  
  scrolling();
  var del=0;
  $(document).on('submit','#file-form',function(e){

    e.preventDefault();
    $.ajax({
        type:'POST',
        url:'/image',
        data:{
            todo:$("#file").val()
        },
    })
    .done(function(data) {
        if (data.categories && data.img){
            $('.pred_img').html(data.img);
            $('.predict_img').text(data.categories);
            myChart.destroy(); 
            let ctx = document.getElementById('myChart').getContext('2d');
            myChart = new Chart(ctx, {
                type: 'polarArea',
                data : {
                    labels: [
                      'CAT',
                      'DOG'
                    ],
                    datasets: [{
                      label: 'My First Dataset',
                      data: [parseFloat(data.cat)*100 ,parseFloat(data.dog)*100],
                      backgroundColor: [
                        'rgb(255, 99, 132)',
                        'rgb(75, 192, 192)'
                      ]
                    }]
                  },
                options: {
                    plugins: {
                        title: {
                            display: true,
                            text: 'Prediction (%)'
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            }); 





        }
    })
    });

let ctx = document.getElementById('myChart').getContext('2d');
    myChart = new Chart(ctx, {
        type: 'polarArea',
        data : {
            labels: [
              'CAT',
              'DOG'
            ],
            datasets: [{
              label: 'My First Dataset',
              data: [0 ,0],
              backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(75, 192, 192)'
              ]
            }]
          },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'PREDECTION'
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    }); 