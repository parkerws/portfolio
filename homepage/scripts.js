$(document).ready(() => { 
    $("#resume").click((e) => {
        e.preventDefault();
        window.location.href = 'files/William_Parker_Resume_10OCT2020.pdf'
    })
    $(function() {
        $("form[name='contact']").validate({

            rules: {
                _replyto: {
                    required: true,
                    email: true
                },
                message: {
                    required: true,
                    minlength: 10
                }
            },

            messages: {
                _replyto: {
                    required: "Please enter an email address",
                    email: "Please enter a valid email address"
                },
                message: {
                    required: "Please enter a message",
                    minlength: "Please enter 10 or more characters"
                }
            },
            submitHandler: function(form) {
                form.submit();
            }
        })
    })
    
});