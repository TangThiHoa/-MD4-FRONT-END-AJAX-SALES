let show = document.getElementById("display");

function findAllProduct() {
    $.ajax({                                                                    // $.ajax()là hàm nhỏ của jQuerry // $ : coi như trang html hiện tại
        type: "GET",
        url: "http://localhost:8080/products",
        success: function (data) {                                              //data là dữ liệu mình gửi sang , nó tự gộp , tự chuyển thành data
            display(data)
        }, error: function (error) {
            console.log(error);
        }
    })
}
function display(data) {
    let content = `<tr style="text-align: center">
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th></th>
                        <th></th>
                        <br>
                    </tr>`;
    console.log(data)
    for (let i = 0; i < data.length; i++) {
        content += getProduct(data[i]);
    }
    show.innerHTML = content;
}
function getProduct(product) {
    return `<tr style="text-align: center">
            <td>${product.id}</td>

            <td>${product.name}</td>

            <td>${product.price}</td>

            <td>${product.quantity}</td>

            <td><button onclick="showEditForm(${product.id})" type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" style="text-align: center">Edit</button></td>       <!--//Nhấn nút gọi sự kiện trong onclick => xuống hàm showEditForm -->

            <td><button onclick="deleteProduct(${product.id})">Delete</button></td>    <!--//Nhấn nút gọi sự kiện trong onclick => xuống hàm deleteProduct -->
            <br>
        </tr>`
}
function showAddForm() {
    let str = "\n" +
        "<input type=\"text\" id=\"name\"placeholder='enter in name'>\n" +
        "<input type=\"number\" id=\"price\"placeholder='enter in price'>\n" +
        "<input type=\"number\" id=\"quatity\"placeholder='enter in quantity'>" +
        "<button onclick='save()'>Add</button>"
    show.innerHTML = str;
}
function save() {
    let name = document.getElementById("name").value;
    let price = document.getElementById("price").value;
    let quatity = document.getElementById("quatity").value;
    let pro = {
        name: name,                                                  //name trước: là tên thuộc tính của đtượng pro , sau :là giá trị được lấy ở trên
        price: price,
        quatity: quatity
    }
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        type: 'POST',
        url: 'http://localhost:8080/products',
        data: JSON.stringify(pro),                                    //chuyển kiểu dữ liệu js thành dạng JSON
        success: function () {
            findAllProduct()//  thay vì hiển thị thông báo alert("Thành công ") thì ta hiển thị luôn ds
            alert("Thêm mới thành công !!!")
        },
        error: function (error) {
            console.log(error)
        }
    })
}
let edit = document.getElementById("display")

function showEditForm(id) {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/products/' + id,                               //lấy dữ liệu từ bên controller
        success: function (product) {                                             //product được binding từ controller qua ( id thành đối tượng )
            console.log("vao day không" + product)
            // let str = `
            //         <input  value="${product.name}" id="name">
            //     <input value="${product.price}" id="price">
            //     <input value="${product.quantity}" id="quantity">
            //     <button onclick="update(${product.id})" >Edit</button>`                //Sau khi nhấn nút Edit gọi đến sự kiện trong onclick rồi vào hàm update
            //
            // edit.innerHTML = str;
        },
        error: function (error) {
            console.log(error)
        }
    })
}

//7.HÀM UPDATE CỦA PRODUCT (sau khi showFormEdit thì hàm này sẽ thực hiện lưu lại )
function update(id) {
    let name = document.getElementById("name").value;
    let price = document.getElementById("price").value;
    let quantity = document.getElementById("quantity").value;
    let pro = {
        id: id,
        name: name,
        price: price,
        quantity: quantity
    }
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        type: 'PUT',
        url: 'http://localhost:8080/products/' + id,
        data: JSON.stringify(pro),
        success: function () {
            console.log("vao day k")
            findAllProduct()
        },
        error: function (error) {
            console.log(error)
        }
    })
}

//8.HÀM DELETE CỦA PRODUCT (nếu muốn xóa 1 dòng /1 sản phẩm trong product)
function deleteProduct(id) {
    $.ajax({
        type: "DELETE",
        url: "http://localhost:8080/products/" + id,
        success: function () {
            findAllProduct()
            alert("Xóa thành công !!!")//xử lý khi thành công trả về list

        }
    });
}

//9.HÀM ORDERBY , SẮP XẾP THEO GIÁ :
function findAllByOrderByPrice() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/products/orderByPrice",
        success: function (data) {         //data là dữ liệu mình gửi sang , nó tự gộp , tự chuyển thành data
            display(data)
        }, error: function (error) {
            console.log(error);
        }
    })
}

//10. HÀM IN RA 3 SẢN PHẨM MỚI NHẤT :
function top3New() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/products/top3New",
        success: function (data) {
            display(data)
        }, error: function (error) {
            console.log(error);
        }
    })
}

//11.SEARCH THEO KHOẢNG GIÁ
function findByPriceBetween() {
    let from = document.getElementById('from').value;
    let to = document.getElementById('to').value;
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/products/priceBetween?from=" + from + "&to=" + to,
        success: function (data) {
            display(data)
        }, error: function (error) {
            console.log(error);
        }
    })
}

//12.SEARCH THEO NAME
function searchByName() {
    let name = document.getElementById('name').value;
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/products/searchName?name=" + name,
        success: function (data) {
            display(data)
        }, error: function (error) {
            console.log(error);
        }
    });
}