export const getEventsFromVEKN = async (isLocal, onSuccess, onError) => {
    fetch(`/api/events?local=${isLocal}`)
        .then(res => res.json())
        .then(({ success, data }) => {
            if (success) {
                onSuccess(data);
            } else {
                onError('No events found.');
            }
        })
        .catch(err => {
            console.error(err);
            onError(err.message);
        });
}

export const getEventDetailsFromVEKN = async (eventId, onSuccess, onError) => {
    fetch(`/api/event?id=${eventId}`)
        .then(res => res.json())
        .then(({ success, data }) => {
            if (success) {
                onSuccess(data);
            } else {
                onError('No event found.');
            }
        })
        .catch(err => {
            console.error(err);
            onError(err.message);
        });
}