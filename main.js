const internet_connectivity_popupbox = document.querySelector(".internet_connectivity_popupbox");
const internet_connectivity_status_icon = document.querySelector(".internet_connection_iconbox i");
const internet_connection_title = document.querySelector(".internet_connection_title");
const internet_connection_description = document.querySelector(".internet_connection_description");
const reconnect_internet_btn = document.querySelector(".reconnect_internet_btn");
let is_online = true;
let connection_timer_seconds = 10, connection_timer_intervalid;

const Check_Internet_Connection = async () => {
    try {
        const api_url = "https://randomuser.me/api/";
        const api_response = await fetch(api_url);
        // ====================================================== if the api response status code is greater than 200 or equal to 200 then internet is working otherwise apiresponse status code is less than 300 then the internet isn't working status code indicates that api call is successful or not ======================================================
        is_online = api_response.status >= 200 && api_response.status < 300;
    }
    catch(error) {
        is_online = false;
    }
    // ====================================================== reset the time & clear the interval & show or hide the popup box according to its content ======================================================
    console.log(is_online);
    connection_timer_seconds = 10;
    clearInterval(connection_timer_intervalid);
    Handle_notification_popup(is_online);
}

const Handle_notification_popup = (internet_connection_status) => {
    if(internet_connection_status) {
        internet_connectivity_status_icon.classList.remove("fa-globe");
        internet_connectivity_status_icon.classList.add("fa-wifi","online");
        internet_connection_title.innerHTML = "restored connection";
        internet_connection_description.innerHTML = "your device is now successfully connected to the internet have a safe browsing";
        return setTimeout(() => {
        internet_connectivity_popupbox.classList.remove("show");
        }, 1000);
    }
    else {
        internet_connectivity_status_icon.classList.remove("fa-wifi","online");
        internet_connectivity_status_icon.classList.add("fa-globe");
        internet_connection_title.innerHTML = "lost connection";
        internet_connection_description.innerHTML = `your network is unavailable we will attempt to reconnect you in <b>10</b> seconds`;
        internet_connectivity_popupbox.classList.add("show");
        connection_timer_intervalid = setInterval(() => {
            connection_timer_seconds--;
            if(connection_timer_seconds === 0) Check_Internet_Connection();
            internet_connectivity_popupbox.querySelector(".internet_connection_description b").innerHTML = connection_timer_seconds;
            // ====================================================== decrement the timer count automatically & if the timer reaches 0 then reset the time from 0 to 100 and clear the interval using clearinterval inside the check internet connnection function ======================================================
        }, 1000);
    }
}

setInterval(() => {
    is_online && Check_Internet_Connection()
}, 3000);
reconnect_internet_btn.addEventListener("click",Check_Internet_Connection);