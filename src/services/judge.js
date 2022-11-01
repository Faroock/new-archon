export const getJudge = (username, onSuccess, onError) => {
    if (!username) {
        return;
    }
    return fetch(`/api/judge?filter=${username}`)
        .then((res) => res.json())
        .then((data) => {
            onSuccess(data.data);
        }).catch((err) => {
            onError(err);
        });
};

export const createJudge = (judge, onSuccess, onError) => {
    getJudge(judge.nickname, (data) => {
        console.log({data});
        if (data && data.length > 0) {
            console.log("Judge already exists", data);
            onError({ message: "Judge already exists" });
        } else {
            fetch('/api/judge', {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(judge)
            }).then((data) => {
                onSuccess(data);
            }).catch((err) => {
                onError(err);
            });
        }
    }, (err) => {
        onError(err);
    });
};