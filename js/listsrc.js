
export function list(iurl, head, desc) {
    let html = `<div class="playlist1 df">
        <div class="playlist_top">
            <div class="play_img">
                <img src="${iurl}" alt="">
            </div>
            <div class="play_text">
                <p>Playlist</p>
                <h1>${head}</h1>
                <p>${desc}</p>
            </div>
        </div>
        <div class="playlist_bottom ">
            <div class="play_btn">
            <svg fill="#1ed760" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
            width="800px" height="800px" viewBox="0 0 408.221 408.221"
            xml:space="preserve">
    <g>
        <g>
            <path fill="#1ed760" d="M204.11,0C91.388,0,0,91.388,0,204.111c0,112.725,91.388,204.11,204.11,204.11c112.729,0,204.11-91.385,204.11-204.11
                C408.221,91.388,316.839,0,204.11,0z M286.547,229.971l-126.368,72.471c-17.003,9.75-30.781,1.763-30.781-17.834V140.012
                c0-19.602,13.777-27.575,30.781-17.827l126.368,72.466C303.551,204.403,303.551,220.217,286.547,229.971z"/>
        </g>
    </g>
    </svg>
            </div>
            <table>
                <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Artist</th>
                    <th>Date added
                    </th>
                    <th><svg height="20px" data-encore-id="icon" role="img" aria-hidden="true"
                            viewBox="0 0 16 16" class="Svg-sc-ytk21e-0 kPpCsU">
                            <path fill="#a7a7a7"
                                d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z">
                            </path>
                            <path fill="#a7a7a7"
                                d="M8 3.25a.75.75 0 0 1 .75.75v3.25H11a.75.75 0 0 1 0 1.5H7.25V4A.75.75 0 0 1 8 3.25z">
                            </path>
                        </svg></th>
                </tr>
            </table>

            <div class="line"></div>
            <table class="play_songs">
            
            </table>
        </div>
    </div>`
    document.querySelector(".playlist").style.height = "1400px"
    document.querySelector(".playlist").innerHTML = html;
}
export function slist(no, title, artist, date, dur) {
    let html = `<tr>
        <th>${no}</th>
        <th>${title}</th>
        <th>${artist}</th>
        <th>${date}</th>
        <th>${dur}</th>
    </tr>`
    document.querySelector(".play_songs").innerHTML = document.querySelector(".play_songs").innerHTML + html;

}
export function ran(no, n1, s, l) {

    document.addEventListener("DOMContentLoaded", function () {
        let boxes = document.querySelector(".playlist_top");

        function color(n, f, s, l) {
            let a = Math.ceil((Math.random() * n) + f);
            console.log(a)
            return `hsl(${a},${s}%,${l}%)`;
        }

        // console.log(color());

        if (boxes) {
            boxes.style.backgroundColor = color(no, n1, s, l);
        }
    });
}
export async function getSongs(x) {
    let p = await fetch(`/Playlist/${x}/`)
    let response = await p.text()
    // console.log(response);
    let div = document.createElement("div");
    div.innerHTML = response;
    let as = div.getElementsByTagName("a")
    // console.log(as);
    let song = [];
    for (let i = 0; i < as.length; i++) {
        const element = as[i];
        if (element.href.endsWith(".mp3")) {
            song.push(element.href)
        }

    }
    return song

}
export function getDuration(src) {
    return new Promise(function (resolve) {
        var audio = new Audio();
        audio.addEventListener("loadedmetadata", function () {
            resolve(audio.duration);
        });
        audio.src = src;
    });
}
export function secondsToMMSS(seconds) {
    // Ensure input is a valid number
    if (isNaN(seconds) || seconds < 0) {
        return "Invalid input";
    }

    // Calculate minutes and seconds
    var minutes = Math.floor(seconds / 60);
    var remainingSeconds = Math.floor(seconds % 60);

    // Add leading zero if necessary
    minutes = minutes < 10 ? "0" + minutes : minutes;
    remainingSeconds = remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds;

    // Combine minutes and seconds in "MM:SS" format
    var formattedTime = minutes + ":" + remainingSeconds;

    return formattedTime;
}

export let currentsong = new Audio();
export function playMusic(track, pause = false, x) {
    currentsong.src = (`/Playlist/${x}/` + track)
    if (!pause) {
        setTimeout(() => {

            currentsong.play();
        }, 500);
        play.innerHTML = `<svg width="800px" height="800px" viewBox="0 0 29 24" fill="none" xmlns="http://www.w3.org/2000/svg">

            <g id="SVGRepo_bgCarrier"  stroke-width="0"/>
            
            <g id="SVGRepo_tracerCarrier" stroke="#a7a7a7" stroke-linecap="round" stroke-linejoin="round"/>
            
            <g id="SVGRepo_iconCarrier"> <circle cx="12" cy="12" r="10" stroke="#a7a7a7" stroke-width="0.7"/> <path fill="#a7a7a7" d="M8 9.5C8 9.03406 8 8.80109 8.07612 8.61732C8.17761 8.37229 8.37229 8.17761 8.61732 8.07612C8.80109 8 9.03406 8 9.5 8C9.96594 8 10.1989 8 10.3827 8.07612C10.6277 8.17761 10.8224 8.37229 10.9239 8.61732C11 8.80109 11 9.03406 11 9.5V14.5C11 14.9659 11 15.1989 10.9239 15.3827C10.8224 15.6277 10.6277 15.8224 10.3827 15.9239C10.1989 16 9.96594 16 9.5 16C9.03406 16 8.80109 16 8.61732 15.9239C8.37229 15.8224 8.17761 15.6277 8.07612 15.3827C8 15.1989 8 14.9659 8 14.5V9.5Z" /> <path fill="#a7a7a7" d="M13 9.5C13 9.03406 13 8.80109 13.0761 8.61732C13.1776 8.37229 13.3723 8.17761 13.6173 8.07612C13.8011 8 14.0341 8 14.5 8C14.9659 8 15.1989 8 15.3827 8.07612C15.6277 8.17761 15.8224 8.37229 15.9239 8.61732C16 8.80109 16 9.03406 16 9.5V14.5C16 14.9659 16 15.1989 15.9239 15.3827C15.8224 15.6277 15.6277 15.8224 15.3827 15.9239C15.1989 16 14.9659 16 14.5 16C14.0341 16 13.8011 16 13.6173 15.9239C13.3723 15.8224 13.1776 15.6277 13.0761 15.3827C13 15.1989 13 14.9659 13 14.5V9.5Z"/> </g>
            
            </svg>`

    }
    // console.log(track)
    document.querySelector(".song_info").innerHTML = `<h2>${track.split("-")[0]}</h2>
    <p>by ${(track.split("-")[1]).split(".")[0]} </p> `
    document.querySelector(".song_time").innerHTML = `00:00/00:00`


}
// Second.js

// if (localStorage.getItem("im") !== undefined) {
//     // Convert the stored value to a number
//     im = parseInt(localStorage.getItem("im"), 10) || 0;
// }

// Retrieve the value from '--val' in local storage
let storedValue = localStorage.getItem('--val');
export function recent(x, t, by, im, flag, r, q) {

    im = parseInt(im, 10)
    let html = `<div data-link="${x}" class="create br df">
        <span class="no">${im + 1}</span>
        <span class="t1">${t}
        </span>
        <span class="t2">${by}
        </span>
    <button><svg fill="#a7a7a7" height="800px" width="800px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
        viewBox="0 0 60 60" xml:space="preserve">
    <g>
    <path d="M45.563,29.174l-22-15c-0.307-0.208-0.703-0.231-1.031-0.058C22.205,14.289,22,14.629,22,15v30
        c0,0.371,0.205,0.711,0.533,0.884C22.679,45.962,22.84,46,23,46c0.197,0,0.394-0.059,0.563-0.174l22-15
        C45.836,30.64,46,30.331,46,30S45.836,29.36,45.563,29.174z M24,43.107V16.893L43.225,30L24,43.107z"/>
    <path d="M30,0C13.458,0,0,13.458,0,30s13.458,30,30,30s30-13.458,30-30S46.542,0,30,0z M30,58C14.561,58,2,45.439,2,30
        S14.561,2,30,2s28,12.561,28,28S45.439,58,30,58z"/>
    </g>
    </svg></button>
    </div>`
    if (im == 0) {
        document.querySelector(".scroll1").innerHTML = document.querySelector(".scroll1").innerHTML + html;
        r.push(currentsong.src)
        // p[im] = x;
        // q[im]=html;
        q.push(html)
        console.log(r[im]);
        im++;
    }

    else {
        console.log("im=" + im);
        if (im > 9) {
            
            im = 0;
            r[0] = currentsong.src;

            // p[0] = x;
            q[0] = `<div data-playlist="${x}" class="create br df">
                <span class="no">${im + 1}</span>
                <span class="t1">${t}
                </span>
                <span class="t2">${by}
                </span>
                <button><svg fill="#a7a7a7" height="800px" width="800px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
                viewBox="0 0 60 60" xml:space="preserve">
                <g>
                <path d="M45.563,29.174l-22-15c-0.307-0.208-0.703-0.231-1.031-0.058C22.205,14.289,22,14.629,22,15v30
                c0,0.371,0.205,0.711,0.533,0.884C22.679,45.962,22.84,46,23,46c0.197,0,0.394-0.059,0.563-0.174l22-15
                C45.836,30.64,46,30.331,46,30S45.836,29.36,45.563,29.174z M24,43.107V16.893L43.225,30L24,43.107z"/>
                <path d="M30,0C13.458,0,0,13.458,0,30s13.458,30,30,30s30-13.458,30-30S46.542,0,30,0z M30,58C14.561,58,2,45.439,2,30
                S14.561,2,30,2s28,12.561,28,28S45.439,58,30,58z"/>
                </g>
                </svg></button>
                </div>`;
            document.querySelector(".scroll1").innerHTML = `<div data-playlist="${x}" class="create br df">
                <span class="no">${im + 1}</span>
                <span class="t1">${t}
                </span>
                <span class="t2">${by}
                </span>
                <button><svg fill="#a7a7a7" height="800px" width="800px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
                viewBox="0 0 60 60" xml:space="preserve">
                <g>
                <path d="M45.563,29.174l-22-15c-0.307-0.208-0.703-0.231-1.031-0.058C22.205,14.289,22,14.629,22,15v30
                c0,0.371,0.205,0.711,0.533,0.884C22.679,45.962,22.84,46,23,46c0.197,0,0.394-0.059,0.563-0.174l22-15
                C45.836,30.64,46,30.331,46,30S45.836,29.36,45.563,29.174z M24,43.107V16.893L43.225,30L24,43.107z"/>
                <path d="M30,0C13.458,0,0,13.458,0,30s13.458,30,30,30s30-13.458,30-30S46.542,0,30,0z M30,58C14.561,58,2,45.439,2,30
                S14.561,2,30,2s28,12.561,28,28S45.439,58,30,58z"/>
                </g>
                </svg></button>
                </div>`;

            console.log(r[im]);
            im++;
        }
        else {
            let scroll1 = document.querySelector('.scroll1');
            for (let i = 0; i < im; i++) {

                let currentInnerText = scroll1.children[i].children[1].innerText;
                if (currentInnerText.trim() === t.trim()) {
                    // Break out of the loop if a match is found
                    flag = 0;
                    break;
                } else {
                    // Add HTML content if no match is found
                    flag = 1;
                }
            }
            if (flag == 1) {
                scroll1.innerHTML += html;
                r[im] = currentsong.src;
                // p[im] = x;
                q[im] = html;
                console.log(r[im]);
                im++;
            }

        }
    }


    localStorage.setItem("im", im)
    localStorage.setItem('playname', JSON.stringify(q));
    localStorage.setItem('myArray', JSON.stringify(r));
}
export function updateRecentlyPlayed(audioSrc) {
    // Store the information about the recently played audio
    var recentlyPlayed = {
        src: audioSrc,
        playedAt: new Date()
    };
    return (recentlyPlayed)
}