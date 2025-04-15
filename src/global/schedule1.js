
/* note for later: the turns in the actions maybe or maybe should not
have been put as zero based, they should be put like one based, If im explaning
myself correctly, anyways, change it as you see fit william of the future.*/
export const schedule1 = {
"id": 0,
"title": "Schedule default 1",
"day": null,
"actions": [
    {"type":"fatigue", "turn": 0, "amount": -0.00416*2, "name":"Sleep"},
    {"type":"fatigue", "turn": 1, "amount": -0.00416*2, "name":"Sleep"},
    {"type":"fatigue", "turn": 2, "amount": -0.00416*2, "name":"Sleep"},
    {"type":"fatigue", "turn": 3, "amount": -0.00416*2, "name":"Sleep"},
    {"type":"fatigue", "turn": 4, "amount": -0.00416*2, "name":"Sleep"},
    {"type":"fatigue", "turn": 5, "amount": -0.00416*3, "name":"Sleep"},
    {"type":"fatigue", "turn": 6, "amount": -0.00416*3, "name":"Sleep"},
    {"type":"fatigue", "turn": 7, "amount": -0.00416*3, "name":"Sleep"},
    {"type":"fatigue", "turn": 8, "amount": -0.00416*3, "name":"Sleep"},
    {"type":"work", "turn": 9, "amount": 1, "name":"Work"},
    {"type":"work", "turn": 10, "amount": 1, "name":"Work"},
    {"type":"work", "turn": 11, "amount": 1, "name":"Work"},
    {"type":"calories", "turn": 12, "amount": 500, "name":"Eat"},
    {"type":"work", "turn": 13, "amount": 1, "name":"Work"},
    {"type":"work", "turn": 14, "amount": 1, "name":"Work"},
    {"type":"work", "turn": 15, "amount": 1, "name":"Work"},
    {"type":"calories", "turn": 16, "amount": 500, "name":"Eat"},
    {"type":"work", "turn": 17, "amount": 1, "name":"Work"},
    {"type":"work", "turn": 18, "amount": 1, "name":"Work"},
    {"type":"training", "turn": 19, "amount": 1, "name":"Training"},
    {"type":"training", "turn": 20, "amount": 1, "name":"Training"},   
    {"type":"training", "turn": 21, "amount": 1, "name":"Training"},
    {"type":"training", "turn": 22, "amount": 1, "name":"Training"},
    {"type":"calories", "turn": 23, "amount": 500, "name":"Eat"},
]

}
