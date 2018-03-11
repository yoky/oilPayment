import css from './src/index/index.scss';

var result;
$(document).on('click', '.item', function() {
    $('#modal-wrap .beforeOrder').show();
    $('#modal-wrap .afterOrder').hide();
    $('.modal-footer').show();
    $('.money').text('');

    var num = $(this).find('span').text();
    console.log(num);
    $('#modal-wrap').modal({
        // backdrop: 'static',
        show: true
    });
    $('.qiangNum').text(num);
});

$(document).on('click', '.num', function() {
    var num = $(this).text();
    var money = $('.money').text();
    if (num == '.' && money == '') return;
    $('.money').text(money + num);
});
$(document).on('click', '.fixM', function() {
    var num = $(this).text();
    $('.money').text(num);
});
$('.del').on('click', function() {
    var money = $('.money').text();
    if (money) {
        $('.money').text(money.substr(0, money.length - 1));
    }
});
$('#aliPay').on('click', function() {
    if (!$('.money').text()) {
        alert('请填写金额');
        return;
    }
    $.ajax({
        url: 'http://posview.19jiayou.cn/api/order.pos.create.ashx',
        type: 'POST',
        data: {
            sid: 1,
            operator: '1070708',
            amount: $('.money').text(),
            gunid: $('.qiangNum').text(),
            oil: '95#',
            price: '7.15',
            amount_payable: $('.money').text()
        }
    }).done(function(res) {
        $('#modal-wrap .beforeOrder').hide();
        $('#modal-wrap .afterOrder').show();
        $('#modal-wrap .afterOrder .code').val('');
        $('#modal-wrap .code input').focus();
        $('.modal-footer').hide();

        console.log(res);
        result = res;

    }).fail(function(e) {
        console.log(e);
    })
});
$('.code input').on(('keypress'), function(event) {
    if (event.keyCode == 13) {
        payMoney();
    }
})
$('.pay').on('click', function() {
    payMoney();
})

function payMoney() {
    var code = $('.code input').val();
    if (!code) {
        alert('请扫码');
        return;
    }
    $.ajax({
        url: 'http://posview.19jiayou.cn/api/order.alipay.trade.pay.ashx',
        type: 'GET',
        data: {
            sys_order_id: result.Data.Id,
            auth_code: code
        }
    }).done(function(data) {
        console.log(result.code);
        $.ajax({
            url: 'http://posview.19jiayou.cn/api/print.job.add.ashx',
            type: 'POST',
            data: {
                type: 0,
                data: result.Data.Id
            }
        }).done(function() {
            $('#modal-wrap').modal('hide');
        })
    }).fail(function(e) {
        console.log(e);
    })
}