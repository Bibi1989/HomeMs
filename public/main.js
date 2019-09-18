
$(document).ready(function() {
    // alert("Welcome!!!")
    
    $("#form").submit(e => {
        e.preventDefault()
        let name = $("#names").val()
        let email = $("#email").val()
        let phone = Number($("#phone").val())
        let dob = $("#date").val()
        let other = $("#other").val()
        // let gender = $([name="value"]).val()
         
            $.ajax({
                url: "http://localhost:3000/patient",
                method: "post",
                data: {
                    name, email, phone, dob, other
                }
            }).done(data => {
                $("#names").val('')
                $("#email").val('')
                $("#phone").val('')
                $("#date").val('')
                $("#other").val('')
                $("#row").append(
                    `
                    <div class="col-4">
                        <div class="card" style="width: 18rem;">
                            <div class="card-body">
                                <h2>Name: ${data.name}</h2>
                                <p>Email: ${data.email}</p>
                                <p>Phone: ${Number(data.phone)}</p>
                                <p>Date Of Birth: ${data.dob}</p>
                                <p>Health Status: ${data.other}</p>
                            </div>
                            <button class="btn btn-warning my-2" id="view">View</button>
                            
                            <button class="btn btn-danger my-2" id="delete-${data.id}">Delete</button>
                        </div>
                    </div>
                    `
                )
            })
    })


    
    $.ajax({
        url: "http://localhost:3000/patient",
        method: "get",
    }).done(data => {
        for(let i = 0; i < data.length; i++) {
            console.log(data[i].id)
            $("#row").append(
                `
                <div class="col-4 col-lg-4 col-md-6 col-sm-6 col-xs-10">
                    <div class="card" style="width: 18rem;">
                        <div class="card-body">
                            <h2>Name: ${data[i].name}</h2>
                            <p>Email: ${data[i].email}</p>
                            <p>Phone: ${data[i].phone}</p>
                            <p>Date Of Birth: ${data[i].dob}</p>
                            <p>Health Status: ${data[i].other}</p>
                        </div>
                        <button class="btn btn-warning my-2" data-toggle="modal" data-target="#view" id="view-${data[i].id}">View</button>
                        <button class="btn btn-primary my-2" data-toggle="modal" data-target="#update" id="update-${data[i].id}">Update</button>
                        <button class="btn btn-danger my-2" id="delete-${data[i].id}">Delete</button>
                    </div>
                </div>
                `
            )
        }
        $(".btn-danger").on("click", (event) => {
            let deleteId = event.target.id.split("delete-").join("")
            $.ajax({
                url: `http://localhost:3000/patient/${deleteId}`,
                method: "delete",
            }).done(() => {
                alert("Deleted")
            })
            // alert(deleteId)
        })

        $(".btn-primary").on("click", (event) => {
            let name = $("#names")
            let email = $("#email").val()
            let phone = Number($("#phone").val())
            let dob = $("#date").val()
            let other = $("#other").val()
            let updateId = event.target.id.split("update-").join("")
            $.ajax({
                url: `http://localhost:3000/patient/${updateId}`,
                method: "put",
            }).done((data) => {
                console.log(data.name)
                // window.location = "patientForm.html"
                name.val(data.name)
                email.val(data.email)
                phone.val(data.phone)
                $(".view").html(
                    `
                    <div class="card-body">
                        <form id="upd">
                        <div class="form-group">
                        <label for="names">Full Names</label>
                        <input type="text" class="form-control" id="names" aria-describedby="emailHelp" placeholder="Enter Full Name..">
                        </div>
                        <div class="form-group">
                        <label for="email">Email address</label>
                        <input type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email">
                        </div>
                        <div class="form-group">
                        <label for="password">Phone Number</label>
                        <input type="number" class="form-control" id="phone" placeholder="Phone Number">
                        </div>
                        </form> 
                    </div>
                `
                )
            })
            let url= `http://localhost:3000/patient/${updateId}`
            // alert(url)
        })

        $(".btn-warning").on("click", (event) => {
            let viewId = event.target.id.split("view-").join("")
            $.ajax({
                url: `http://localhost:3000/patient/${viewId}`,
                method: "get",
            }).done((data) => {
                    $(".view").html(
                        `
                        <div class="card-body">
                            <h2>Name: ${data.name}</h2>
                            <p>Email: ${data.email}</p>
                            <pPhone: data.phone}</p>
                            <p>Date Of Birth: ${data.dob}</p>
                        </div>
                    `
                    )

            })
            // alert(deleteId)
        })
    })
    
    
    
})


            