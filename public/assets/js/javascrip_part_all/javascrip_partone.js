
function testt(){


}
function part_one() {
  if (document.getElementById("sig_partone").value != "") {
    document.getElementById("sig_wait").style.display = "none";
    document.getElementById("sig_success").style.display = "";
  } else if (document.getElementById("sig_partone").value == "") {
    document.getElementById("sig_wait").style.display = "";
    document.getElementById("sig_success").style.display = "none";
  }
  document.getElementById("header_hide").style.display = "none";

  if (document.getElementById("sig_parttwo").value != "") {
    document.getElementById("sig_wait_two").style.display = "none";
    document.getElementById("sig_success_two").style.display = "";
  } else if (document.getElementById("sig_parttwo").value == "") {
    document.getElementById("sig_wait_two").style.display = "";
    document.getElementById("sig_success_two").style.display = "none";
  }

  document.getElementById("header_hide_two").style.display = "none";

  //   if (document.getElementById("status_test").value == "Yes") {
  //   document.getElementById("yes").checked = true;
  // } else {
  //   document.getElementById("no").checked = true;
  // }
  document.getElementById("header_hide_three").style.display = "none";


  if (document.getElementById("sig_partthree").value != "") {
    document.getElementById("sig_wait_three").style.display = "none";
    document.getElementById("sig_success_three").style.display = "";
  } else if (document.getElementById("sig_partthree").value == "") {
    document.getElementById("sig_wait_three").style.display = "";
    document.getElementById("sig_success_three").style.display = "none";
  }


  if (document.getElementById("testresult").value == "Pass") {
    document.getElementById("pass").checked = true;
  } else {
    document.getElementById("notpass").checked = true;
  }

}




function header_btn_hide() {
  document.getElementById("header_hide").style.display = "";
  document.getElementById("header_show").style.display = "none";
  document.getElementById("fieldset_set").style.display = "none";
}

function header_btn_show() {
  document.getElementById("header_hide").style.display = "none";
  document.getElementById("header_show").style.display = "";
  document.getElementById("fieldset_set").style.display = "";
}

function header_btn_hide_three() {
  document.getElementById("header_hide_three").style.display = "";
  document.getElementById("header_show_three").style.display = "none";
  document.getElementById("fieldset_set_three").style.display = "none";
}

function header_btn_show_three() {
  document.getElementById("header_hide_three").style.display = "none";
  document.getElementById("header_show_three").style.display = "";
  document.getElementById("fieldset_set_three").style.display = "";
}
