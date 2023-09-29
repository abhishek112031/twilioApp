async function postMessage(event) {
    event.preventDefault();

    try {
        const data = {
            to: document.getElementById('countryCode').value+document.getElementById('phoneNumber').value,
            message: document.getElementById('message').value
        }
        // console.log(data)

        const postMessageResp=await axios.post('/sms',data);
        if(postMessageResp.status==200){
            alert(postMessageResp.data.message);
            // document.getElementById('countryCode').value="";
            document.getElementById('phoneNumber').value="";
            document.getElementById('message').value="";


        }


    }
    catch (err) {
        // console.log(err)
        alert(err.response.data.error)
    }


}
