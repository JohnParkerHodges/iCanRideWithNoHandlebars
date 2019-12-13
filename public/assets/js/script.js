const Eaten = id => {
    console.log(id)
    $.ajax({
        method: "PUT",
        url: "/api/burger",
        data: { id: id }
    }).then(() => {
        location.reload();

    })
}

$("#NewBurger").on("submit", function(e) {
    e.preventDefault();
    const burgerName = $("#BurgerName").val();
    console.log(burgerName)

    $.post("/api/burger", { name: burgerName }).then(() => {
        location.reload();

    })

});