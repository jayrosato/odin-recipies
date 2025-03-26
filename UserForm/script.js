function match_passwords() {
    const pass = document.getElementById("password").value;
    const confirm_pass = document.getElementById("confirm_password").value;
    const popup = document.getElementById("myPopup");
    if(pass === confirm_pass && pass != undefined && pass !='') {
        document.getElementById("password").style.borderColor = "green";
        document.getElementById("confirm_password").style.borderColor = "green";
        popup.classList.toggle("hide");
    }
    else if(pass != confirm_pass) {
        document.getElementById("password").style.borderColor = "red";
        document.getElementById("confirm_password").style.borderColor = "red";
        popup.classList.toggle("show");
    }
};

const submit_button = document.getElementById("submit_button");
const form_fields = document.querySelectorAll("input");

let input_fields = []
//on init, get list of fields the user can edit
function create_field_list() {
    for(let input=0; input<form_fields.length; input++) {
        let field_name = form_fields[input].name;
        input_fields.push(field_name);
    };
    return input_fields
}

create_field_list()
const user = {}
function create_user() {
    for(let field=0; field<form_fields.length;field++) {
        //check validity of field first
        const check_validity = form_fields[field].checkValidity();
        if(check_validity == false) {alert(`Double check the ${form_fields[field].name} box!`); return}
        user_input = form_fields[field].value;
        Object.defineProperty(user,
            input_fields[field], {value: user_input});
    };

    document.getElementById('mutable_text_container').innerHTML = `Thank you ${user.first_name} for getting aboard the Cheesecake Industries Train! Choo-choo!`
    
    console.log(user);
};