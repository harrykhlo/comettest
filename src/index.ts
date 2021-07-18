const headingEl: HTMLElement = document.getElementById("heading-el");
headingEl.textContent = "Harry TypeScript Test Environment"

//input values of road CPM
let raod_1_CPM = 1;
let raod_2_CPM = 1;
let raod_3_CPM = 7;
let raod_4_CPM = 1;

class Road {
    constructor(
        public roadName: string,
        public carPerMinute: number,
    ) { }
    setCarPerMinute(carPerMinute: number): void {
        this.carPerMinute = carPerMinute;//CPM
    }
    getCarPerMinute(): number {
        return this.carPerMinute;
    }

}

class Intersection {
    constructor(
        public intersectionName: string,
        public controlProperty: string,
        public efficient_HighTroughput: number,// Total CPM >= 20
        public efficient_MediumTroughput: number,// Total 20 > CPM >= 10
        public efficient_LowTroughput: number,// Total CPM < 10
    ) { }
}

const Intersection1 = new Intersection(
    'Roundabout',
    'Free flowing at low CPM, but at higher CPMs, there is extra congestion and inefficiency.',
    50,
    75,
    90);

const Intersection2 = new Intersection(
    'Stop Signs',
    'No waiting if the intersection is clear, but all users must stop, so it is inefficient at low CPM.',
    20,
    30,
    40);

const Intersection3 = new Intersection(
    'Traffic Lights',
    'Efficient at high CPM, but users may have to wait, even at low CPM',
    90,
    75,
    30);

// console.log(Intersection1);
// console.log(Intersection2);
// console.log(Intersection3);

const road1 = new Road('Road 1 (North)', 11);
const road2 = new Road('Road 2 (East)', 12);
const road3 = new Road('Road 3 (South)', 13);
const road4 = new Road('Road 4 (West)', 14);
// console.log(road1);
// console.log(road1.setCarPerMinute(20));
// console.log(road1.getCarPerMinute());
// console.log(road2);
// console.log(road2.setCarPerMinute(20));
// console.log(road2.getCarPerMinute());
// console.log(road3);
// console.log(road3.setCarPerMinute(20));
// console.log(road3.getCarPerMinute());
// console.log(road4);
// console.log(road4.setCarPerMinute(20));
// console.log(road4.getCarPerMinute());

road1.setCarPerMinute(raod_1_CPM);
road2.setCarPerMinute(raod_2_CPM);
road3.setCarPerMinute(raod_3_CPM);
road4.setCarPerMinute(raod_4_CPM);

// array contains all the roads
const roads: Road[] = [road1, road2, road3, road4];

const dispInputs: string[] = roads.map(road => `CPM of ${road.roadName} is set to be ${road.getCarPerMinute()}`);

dispInputs.map(dispInput => console.log(dispInput));

// array contains all the intersections
const intersections: Intersection[] = [Intersection1, Intersection2, Intersection3];



// calculate total CPM
const totalCPM = (roads: Road[]): number => {
    return roads.reduce((a, b) => a + b.getCarPerMinute(), 0);//sum of CPM of all roads in the array
}

// console.log(totalCPM(roads));

// console.log(intersections);

// calculateEfficiencyScore
const calEfficiencyScores = (intersections: Intersection, cpm: number): number => {
    let efficiency: number;
    if (cpm >= 20) {
        efficiency = intersections.efficient_HighTroughput;
    } else if (cpm < 20 && cpm >= 10) {
        efficiency = intersections.efficient_MediumTroughput;
    } else {
        efficiency = intersections.efficient_LowTroughput;
    }
    console.log(`The efficiency score of ${intersections.intersectionName} would be ${efficiency} if the total CPM is ${cpm}`)
    return efficiency;
}

const dispCalEfficiencyScores = (intersections: Intersection, cpm: number): string => {
    let efficiency: number;
    if (cpm >= 20) {
        efficiency = intersections.efficient_HighTroughput;
    } else if (cpm < 20 && cpm >= 10) {
        efficiency = intersections.efficient_MediumTroughput;
    } else {
        efficiency = intersections.efficient_LowTroughput;
    }
    console.log(`The efficiency score of ${intersections.intersectionName} would be ${efficiency} if the total CPM is ${cpm}`)
    return `The efficiency score of ${intersections.intersectionName} would be ${efficiency} if the total CPM is ${cpm}`;
}

calEfficiencyScores(Intersection1, totalCPM(roads));
calEfficiencyScores(Intersection2, totalCPM(roads));
calEfficiencyScores(Intersection3, totalCPM(roads));


const formEl = document.querySelector('.form1') as HTMLFormElement;
// console.log(formEl);
const inputRoad1CPM_El: HTMLSelectElement = document.querySelector('#Road1CPM');
// console.log(inputRoad1CPM_El);
const inputRoad2CPM_El: HTMLInputElement = document.querySelector('#Road2CPM');
// console.log(inputRoad2CPM_El);
const inputRoad3CPM_El: HTMLInputElement = document.querySelector('#Road3CPM');
// console.log(inputRoad3CPM_El);
const inputRoad4CPM_El: HTMLInputElement = document.querySelector('#Road4CPM');
// console.log(inputRoad4CPM_El);

formEl.addEventListener("submit", (e: Event) => {
    e.preventDefault();
    console.log(inputRoad1CPM_El.value);
    console.log(inputRoad2CPM_El.value);
    console.log(inputRoad3CPM_El.value);
    console.log(inputRoad4CPM_El.value);
    road1.setCarPerMinute(+inputRoad1CPM_El.value);
    road2.setCarPerMinute(+inputRoad2CPM_El.value);
    road3.setCarPerMinute(+inputRoad3CPM_El.value);
    road4.setCarPerMinute(+inputRoad4CPM_El.value);
    calEfficiencyScores(Intersection1, totalCPM(roads));
    calEfficiencyScores(Intersection2, totalCPM(roads));
    calEfficiencyScores(Intersection3, totalCPM(roads));

    const ul = document.querySelector('ul');
    const li_1 = document.createElement('li');
    li_1.innerText = dispCalEfficiencyScores(Intersection1, totalCPM(roads));
    ul.append(li_1);
    const li_2 = document.createElement('li');
    li_2.innerText = dispCalEfficiencyScores(Intersection2, totalCPM(roads));
    ul.append(li_2);
    const li_3 = document.createElement('li');
    li_3.innerText = dispCalEfficiencyScores(Intersection3, totalCPM(roads));
    ul.append(li_3);
})