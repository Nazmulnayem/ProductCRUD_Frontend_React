$.ajaxSetup({
    header: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]'
        ).attr('content')
    }
});
$('#createRestForm').submit(function (e) {
    e.preventDefault();

    let msg = $('#createTaskMessage');
    // Form data
    let rest_name = $('#createRestForm input[rest_name="rest_name"]');
    let rest_img = $('#createRestForm input[rest_img="rest_img"]');
    let rest_about = $('#createRestForm input[rest_about="rest_about"]');
    let rest_img = $('#createRestForm input[rest_img="rest_img"]');
    let rest_about = $('#createRestForm input[rest_about="rest_about"]');
    let formData = {
        name: $(input).val()
    }

    $.ajax({
        type: 'POST',
        url: '/task/store',
        data: formData,
        success: function (data) {
            // reqest message clear
            $(msg).html('');

            // Show success message
            $(msg).append('<div class="alert alert-success"> Task Created Successfully </div>');

            // input value clear
            $(input).val('');

            // append result
            $('#taskTableBody').prepend(`
                <tr data-id="` + data.id + `">
                    <td> ` + data.id + ` </td>
                    <td> ` + data.name + ` </td>
                    <td style="width:150px">
                        <a href="#" data-toggle="modal" data-target="#editTask" class="btn btn-sm btn-primary edit">Edit</a>
                        <a href="#" data-toggle="modal" data-target="#deleteTask"  class="btn btn-sm btn-danger delete">Delete</a>
                    </td>
                </tr>
            `);
        },
        error: function (error) {
            $(msg).html('');

            $(msg).append('<ul id="errorMessage" class="alert alert-danger"></ul>')

            $.each(error.responseJSON.errors, function (index, value) {
                console.log(value[0]);
                $(msg).find('#errorMessage').append(`
                    <li>` + value[0] + ` </li>
                `);
            });
        }
    })
});
