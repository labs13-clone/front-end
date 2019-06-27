import axios from "axios";

export async function getData(token,id) {
    try {
        const result = await axios({
            method: 'get', 
            url: `${process.env.REACT_APP_SERVER}/api/challenges?id=${id}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
    }); 
        return result;
    } catch (e) {
    };
};

export async function getSubmission(token,id) {
    try {
        const result = await axios({
            method: 'get', 
            url: `${process.env.REACT_APP_SERVER}/api/submissions?challenge_id=${id}`,
            headers: {
                        Authorization: `Bearer ${token}`,
                     }
    });
        return result;
    } catch (e) {
    };
};

export async function postSubmission(token,id) {
    try {
        const result = await axios({
            method: 'post', 
            url: `${process.env.REACT_APP_SERVER}/api/submissions`,
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            data: {
                    challenge_id:id
                  }
    });
        return result;
    } catch (e) {
    };
};

export async function updateSubmission(token,solution,subID,path="") {
    try {
        const result = await axios({
            method: 'put', 
            url: `${process.env.REACT_APP_SERVER}/api/submissions${path}`,
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
                     },
            data: {
                    id: subID,
                    solution: solution
                  }
    });
        return result
    } catch (e) {
        console.log(e)
    };
};

export async function resetSubmission(token,subID) {
    try {
        const result = await axios({
            method: 'put', 
            url: `${process.env.REACT_APP_SERVER}/api/submissions/reset`,
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
                     },
            data: {
                    id: subID
                  }
    });
        return result
    } catch (e) {
        console.log(e)
    };
};