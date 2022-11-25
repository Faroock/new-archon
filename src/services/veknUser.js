export const getVeknUser = (name, setVeknUser, setError) => {
    if (name && name.length > 0) {
        setError('');
        fetch(`/api/vekn?filter=${name}`)
        .then(res => res.json())
        .then(({data: veknUser}) => {
            setVeknUser(veknUser);
        })
        .catch(err => {
            console.error(err);
            setError(err.message);
        });
    }
}

export const getVeknUserById = (id, setVeknUser, setError) => {
    if (id) {
        setError('');
        fetch(`/api/vekn?id=${id}`)
        .then(res => res.json())
        .then(({data: veknUser}) => {
            setVeknUser(veknUser[0]);
        })
        .catch(err => {
            console.error(err);
            setError(err.message);
        });
    }
}