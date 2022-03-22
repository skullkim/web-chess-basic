const moveDirection = {
    from: '',
    to: '',
};

function clickedFromAndTo() {
    return moveDirection.from !== '' && moveDirection.to !== '';
}

function refreshDirection() {
    moveDirection.from = '';
    moveDirection.to = '';
}

const pawns = document.querySelectorAll(".pawn");
pawns.forEach((pawn) => {
    pawn.addEventListener('click', ({currentTarget:{id}}) => {
        moveDirection.from === '' ? moveDirection.from = id
            : moveDirection.to = id;
        if (clickedFromAndTo()) {
            fetch(`/move`, {
                method: "POST",
                body: `command=${moveDirection.from},${moveDirection.to}`
            })
                .then(() => {
                    refreshDirection();
                    location.reload()
                })
                .catch(err => console.log(err));
        }
    });
})