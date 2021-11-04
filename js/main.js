jQuery(document).ready(function ($) {
    document.addEventListener('contextmenu', event => event.preventDefault());

    $('.ok').click(function() {
           location.reload();
        });
        
    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    function getRandomIntOtDo(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
      }

    $('#parent_popup').hide();
    $('.boost').hide();
    $('.more_money').hide();
    $('.play').hide();
    $('.pause_animat').hide();

    $('.pause').click(function() {
        myStopFunction();
        $(this).hide();
        $('.play').show();
        $('.pause_animat').show();
     });

     $('.play').click(function() {
        $(this).hide();
        $('.pause_animat').hide();
        $('.pause').show();
        myVar = setInterval(lvlGame,time);
        if(ak){
            weapon = 29;
            $('.opponent').addClass('ak_bought');
            akInt = setInterval(akGun, 250);
        }
     });

var lvl = 0,
time,
hp,
rndTop,
left,
myVar,
akInt,
money = 0,
weapon = 1,
knife = false,
sword = false,
gun = false,
boost = false,
more_money = false,
slow = false,
ak = false,
damage = 0,
gunLvl = 0,
slowVal = 0,
weaponProcent,
proc = 1,
vertolet = false;


$('.buy_knife').click(function(){
   if(money >= 200 && knife == false){
       boost = false;
       money = money - 200;
       weapon = 3;
       weaponProcent = Math.ceil(weapon * proc);
       $('.money').text('У вас: ' + money + ' монет');
       $('.buy_knife').text('Куплено');
       $('.buy_knife').attr('disabled','disabled');
       knife = true;
       $('.opponent').addClass('knife_bought');
       $('.buy_sword').removeAttr('disabled');
   }
});

$('.slow').click(function(){
    if(money >= 700 && slow == false){
        money = money - 700;
        slowVal = slowVal + 600;
        slow = true;
        $('.money').text('У вас: ' + money + ' монет');
        $('.slow').text('Замедлено');
        $('.slow').attr('disabled','disabled');
    }
 });

 
$('.damage').click(function(){
    if(money >= 1000 + 1000 * damage){
        money = money - (1000 + 1000 * damage);
        proc = proc + 0.15;
        $('.money').text('У вас: ' + money + ' монет');
        $('.damage').text('Усилить на 15% (' + Number(damage + 2) + 'lvl - ' + Number(1000 + 1000 * (damage + 1))  + 'монет)');
        damage++;
    }
 });

 $('.buy_sword').click(function(){
    if(money >= 450 && sword == false){
        boost = false;
        money = money - 450;
        weapon = 9;
        weaponProcent = Math.ceil(weapon * proc);
        $('.money').text('У вас: ' + money + ' монет');
        $('.buy_sword').text('Куплено');
        $('.buy_sword').attr('disabled','disabled');
        sword = true;
        $('.opponent').addClass('sword_bought');
        $('.buy_gun').removeAttr('disabled');
    }
 });

 $('.buy_gun').click(function(){
    if(money >= 1000 + 400 * gunLvl && gun == false){
        boost = false;
        $('.opponent').addClass('gun_bought');
        if(gunLvl == 0){
            money = money - (1000 + 400 * gunLvl);
            weapon = 23;
            weaponProcent = Math.ceil(weapon * proc);
            $('.money').text('У вас: ' + money + ' монет');
            gunLvl++;
            $('.buy_gun').text('Прокачать на ' + Number(gunLvl + 1) + 'lvl (1400)');
        }
        else if(gunLvl == 1){
            money = money - (1000 + 400 * gunLvl);
            weapon = 31;
            weaponProcent = Math.ceil(weapon * proc);
            $('.money').text('У вас: ' + money + ' монет');
            gunLvl++;
            $('.buy_gun').text('Прокачать на ' + Number(gunLvl + 1) + 'lvl (1800)');
        }
        else if(gunLvl == 2){
            money = money - (1000 + 400 * gunLvl);
            weapon = 41;
            weaponProcent = Math.ceil(weapon * proc);
            $('.money').text('У вас: ' + money + ' монет');
            $('.buy_gun').text('Макс. уровень');
            $('.buy_gun').attr('disabled','disabled');
            gun = true;
            $('.buy_ak').removeAttr('disabled');
        }
    }
 });


 $('.buy_ak').click(function(){
    if(money >= 2200 && ak == false){
        boost = false;
        money = money - 2200;
        weapon = 58;
        weaponProcent = Math.ceil(weapon * proc);
        $('.money').text('У вас: ' + money + ' монет');
        $('.buy_ak').text('Куплено');
        $('.buy_ak').attr('disabled','disabled');
        ak = true;
        $('.opponent').addClass('ak_bought');
        //$('.buy_').removeAttr('disabled');
    }
 });


function lvlGame(){
    left = left - 25;
    if(vertolet == true){
        left = left - 50;
    }
    $('.opponent').css({ 
     "left": left + "px",
    })
    if(left<=12){
        $('#parent_popup').show();
        clearInterval(myVar);
        clearInterval(akInt);
    }
}

function akGun(){
   $('.opponent').trigger('click');
}

$('.boost').click(function(){
    $('.boost').hide();
    boost = true;
    if(boost == true){
    weapon = weapon * 18;
    weaponProcent = Math.ceil(weapon * proc);
    }
});

$('.more_money').click(function(){
    $('.more_money').hide();
    more_money = true;
    if(more_money == true){
    money = money + 15 * Number(lvl);
    $('.money').text('У вас: ' + money + ' монет');
    }
});

function myStopFunction() {
    clearInterval(myVar);
    clearInterval(akInt);
  }

function levelStart(){
   myStopFunction();
   $('.boost').hide();
   $('.more_money').hide();
   time = 1000;
   lvl++;
   time = time - lvl * 60 + slowVal;
   if(time<=100){
       if(slow){
           time = 180;
       } 
       else{
        time = 100;
       }
   }
   weaponProcent = Math.ceil(weapon * proc);
   console.log(weaponProcent);
   if(lvl<20){
    hp = lvl * 10;
   }
   if(lvl>20 && lvl<25){
    hp = lvl * 14;
   }
   if(lvl>=25 && lvl<30){
    hp = lvl * 25;
   }
   if(lvl>30 && lvl<35){
    hp = lvl * 34;
   }
   if(lvl>=35 && lvl<40){
    hp = lvl * 42;
   }
   if(lvl>40 && lvl<45){
    hp = lvl * 53;
   }
   if(lvl>=45){
    hp = lvl * 62;
   }
   $('.hp_opponent').text('Хп врага: ' + hp);
   rndTop = getRandomInt(420);
   rndleft = getRandomInt(1300);
   rndTopMoney = getRandomInt(360);
   rndleftMoney = getRandomInt(1200);
   left = 1330;

   $('.your_lvl').text('Уровень: ' + lvl);
   $('.money').text('У вас: ' + money + ' монет');

   $('.game_window').append($('<span class="opponent"></span>'));

   $('.opponent').css({ 
    "top": rndTop + "px",
    });

    if(lvl == 10){
        $('.opponent').css({ 
            "background-image": "url(./img/boss.gif)",
            "width" : "80px",
            "height" : "80px"
        });
        vertolet = true;
        hp = 75;
        $('.hp_opponent').text('Хп врага: ' + hp);
    }
    if(lvl != 10){
        vertolet = false;
    }

    if(lvl == 20){
        $('.opponent').css({ 
            "background-image": "url(./img/boss1.gif)",
            "width" : "96px",
            "height" : "96px"
        });
        time = 70;
        hp = 90;
        $('.hp_opponent').text('Хп врага: ' + hp);
    }

    if(lvl == 30){
    $('.opponent').css({ 
        "background-image": "url(./img/pter.gif)",
        "width" : "120px",
        "height" : "120px"
    });
    time = 700;
    hp = 8000;
    $('.hp_opponent').text('Хп врага: ' + hp);
    }

    if(lvl == 40){
        $('.opponent').css({ 
            "background-image": "url(./img/rocket.gif)",
            "width" : "172px",
            "height" : "72px"
        });
        time = 250;
        hp = 5000;
        $('.hp_opponent').text('Хп врага: ' + hp);
        }

        /*if(lvl == 50){
            $('.opponent').css({ 
                "background-image": "url(./img/rocket.gif)",
                "width" : "172px",
                "height" : "72px"
            });
            time = 250;
            hp = 5000;
            $('.hp_opponent').text('Хп врага: ' + hp);
            }*/

if(knife){
    $('.opponent').addClass('knife_bought');
}

if(sword){
    $('.opponent').addClass('sword_bought');
}

if(gunLvl>=1){
    $('.opponent').addClass('gun_bought');
}

if(ak){
    weapon = 29;
    $('.opponent').addClass('ak_bought');
    akInt = setInterval(akGun, 250);
}

     $('.opponent').click(function(){
        hp = hp - weaponProcent;
        $('.hp_opponent').text('Хп врага: ' + hp);
        if(boost == true){
            boost = false;
            weapon = weapon / 18;
            weaponProcent = Math.ceil(weapon * proc);
        }
    });

if(lvl == getRandomIntOtDo(lvl-1, Number(lvl+9))){
    $('.boost').css({ 
        "top": rndTop + "px",
        "left": rndleft + "px"
    });
    $('.boost').show();
}

if(lvl == getRandomIntOtDo(lvl-1, Number(lvl+9))){
    $('.more_money').css({ 
        "top": rndTopMoney + "px",
        "left": rndleftMoney + "px"
    });
    $('.more_money').show();
}

    myVar = setInterval(lvlGame,time);
}

levelStart();

     $('.hp_opponent').text('Хп врага: ' + hp);

     $('.game_window').click(function(){
        if(hp <= 0){
            $('.opponent').remove();
            money = money + 10 + 10 * lvl;
            levelStart();
         }
     });

});