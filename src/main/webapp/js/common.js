$(function () {
    $('.area').on('click','.check',function () {
        var flag = true;
        $('.check').each(function () {
            if($(this).prop('checked') == false) {
                flag = false;
                $('#checkAll').prop('checked',false);
            }
        });
        if(flag == true) {
            $('#checkAll').prop('checked', true);
        }
    });

    $('#checkAll').click(function () {
        if($(this).prop('checked') == true) {
            $('.check').each(function () {
                $(this).prop('checked',true);
            });
        }else {
            $('.check').each(function () {
                $(this).prop('checked',false);
            });
        }
    });

    layui.use('laydate', function(){
        var laydate = layui.laydate;
        laydate.render({
            elem: '#time',
            type: 'date'
        });
    });

    $('#name').focus(function () {
        var name = $('#name').val().trim();
        if(name == '全部') {
            $(this).val('');
        }
    });
    $('#name').blur(function () {
        var name = $('#name').val().trim();
        if(name == '') {
            $(this).val('全部');
        }
    });
    $('#reset').click(function () {
        $('#name').val('全部');
        $('#time').val('');
    });
})

