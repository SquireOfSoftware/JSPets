// Land
// Each piece of land has a "state" and a set of cities
// each city has a set of "biomes" and a step count to reach the center of the city
function State(name, regions) {
    this.name = name;
    this.regions = regions;
}

function City(referenceState, coordinates, stepCount/*, difficulty*/, biomes){
    
	this.coordinates = coordinates;
    this.stepCount = stepCount;
    this.referenceState = referenceState;
	this.name = this.referenceState.name;
	
	this.biomes = [];
	
	for(var biomeIndex = 0; biomeIndex < biomes.length; biomeIndex++) {
		for(var counter = 0; counter < biomes[biomeIndex].percentage; counter++) {
			this.biomes.push(biomes[biomeIndex].state);
		}
	}
	
	this.getRandomBiome = function() {
		var biomeValue = Math.round(Math.random() * (this.biomes.length - 1), 0);
		
		return this.biomes[biomeValue];
	};
}

function getCoordinates(x, y) {
    if (x > 45)
        x -= 45;
    if (y > 20)
        y -= 20;
	return {x: x - 1, y: y - 1}; 
}

function BiomeState(state, percentage) {
	this.state = state;
	this.percentage = percentage;
}

var australia = {
    TAS: new State(
        "TAS",
		[
		    [
                // NORTH
                new City(
                    MAP_STATES.TAS.substates.REDPA,
                    getCoordinates(4, 3),
                    3,
					[
						new BiomeState(BIOMES.COASTAL, 5),
						new BiomeState(BIOMES.GRASSLANDS, 4),
						new BiomeState(BIOMES.URBAN, 1)
					]
                ),
                new City(
                    MAP_STATES.TAS.substates.SMITHTON,
                    getCoordinates(8, 2),
                    3,
					[
						new BiomeState(BIOMES.COASTAL, 3),
						new BiomeState(BIOMES.GRASSLANDS, 4),
						new BiomeState(BIOMES.URBAN, 3)
					]
                ),
                new City(
                    MAP_STATES.TAS.substates.BURNIE_SOMERSET,
                    getCoordinates(17, 6),
                    3,
					[
						new BiomeState(BIOMES.COASTAL, 6),
						new BiomeState(BIOMES.URBAN, 4)
					]
                ),
                new City(
                    MAP_STATES.TAS.substates.CRADLE_MOUNTAIN,
                    getCoordinates(17, 12),
                    3,
					[
						new BiomeState(BIOMES.MARINE, 3),
						new BiomeState(BIOMES.CRAGS, 2),
						new BiomeState(BIOMES.ALPINE, 1),
						new BiomeState(BIOMES.WETLANDS, 4)
					]
                ),
                new City(
                    MAP_STATES.TAS.substates.DELORAINE,
                    getCoordinates(25, 11),
                    3,
					[
						new BiomeState(BIOMES.URBAN, 1),
						new BiomeState(BIOMES.PLAINS, 4),
						new BiomeState(BIOMES.ALPINE, 1),
						new BiomeState(BIOMES.WETLANDS, 4)
					]
                ),
                new City(
                    MAP_STATES.TAS.substates.GEORGE_TOWN,
                    getCoordinates(27, 6),
                    3,
					[
						new BiomeState(BIOMES.COASTAL, 4),
						new BiomeState(BIOMES.URBAN, 1),
						new BiomeState(BIOMES.WETLANDS, 5)
					]
                ),
                new City(
                    MAP_STATES.TAS.substates.MUSSELROE_BAY,
                    getCoordinates(41, 3),
                    3,
					[
						new BiomeState(BIOMES.BEACH, 4),
						new BiomeState(BIOMES.COASTAL, 3),
						new BiomeState(BIOMES.GRASSLANDS, 4)
					]
                ),
                new City(
                    MAP_STATES.TAS.substates.SCAMANDER,
                    getCoordinates(42, 12),
                    3,
					[
						new BiomeState(BIOMES.BEACH, 10)
					]
                ),
                new City(
                    MAP_STATES.TAS.substates.LAUNCESTON,
                    getCoordinates(30, 10),
                    3,
					[
						new BiomeState(BIOMES.URBAN, 6),
						new BiomeState(BIOMES.CRAGS, 1),
						new BiomeState(BIOMES.GRASSLANDS, 3)
					]
                ),
                new City(
                    MAP_STATES.TAS.substates.CAMPBELL_TOWN,
                    getCoordinates(34, 17),
                    3,
					[
						new BiomeState(BIOMES.URBAN, 1),
						new BiomeState(BIOMES.WETLANDS, 5),
						new BiomeState(BIOMES.GRASSLANDS, 4)
					]
                ),
                new City(
                    MAP_STATES.TAS.substates.DERWENT_BRIDGE,
                    getCoordinates(21, 18),
                    3,
					[
						new BiomeState(BIOMES.RAINFOREST, 6),
						new BiomeState(BIOMES.MARINE, 3),
						new BiomeState(BIOMES.WETLANDS, 1)
					]
                ),
                new City(
                    MAP_STATES.TAS.substates.QUEENSTOWN,
                    getCoordinates(13, 18),
                    3,
					[
						new BiomeState(BIOMES.ALPINE, 1),
						new BiomeState(BIOMES.CRAGS, 4),
						new BiomeState(BIOMES.URBAN, 2),
						new BiomeState(BIOMES.PLAINS, 3)
					]
                )
			]
			,
			[
				// SOUTH
				new City(
					MAP_STATES.TAS.substates.STRAHAN,
					getCoordinates(19, 22), // next map
					3,
					[
						new BiomeState(BIOMES.COASTAL, 5),
						new BiomeState(BIOMES.URBAN, 5)
					]
				),
				new City(
					MAP_STATES.TAS.substates.STRATHGORDON,
					getCoordinates(19, 30),
					3,
					[
						new BiomeState(BIOMES.RAINFOREST, 7),
						new BiomeState(BIOMES.MARINE, 1),
						new BiomeState(BIOMES.WETLANDS, 2)
					]
				),
				
				new City(
					MAP_STATES.TAS.substates.BOTHWELL,
					getCoordinates(29, 25),
					3,
					[
						new BiomeState(BIOMES.GRASSLANDS, 5),
						new BiomeState(BIOMES.PLAINS, 5)
					]
				),
				new City(
					MAP_STATES.TAS.substates.TRIABUNNA,
					getCoordinates(39, 27),
					3,
					[
						new BiomeState(BIOMES.COASTAL, 3),
						new BiomeState(BIOMES.URBAN, 1),
						new BiomeState(BIOMES.WETLANDS, 6)
					]
				),
				new City(
					MAP_STATES.TAS.substates.HOBART,
					getCoordinates(32, 31),
					3,
					[
						new BiomeState(BIOMES.COASTAL, 3),
						new BiomeState(BIOMES.URBAN, 4),
						new BiomeState(BIOMES.WETLANDS, 3)
					]
				),
				new City(
					MAP_STATES.TAS.substates.PORT_ARTHUR,
					getCoordinates(38, 36),
					3,
					[
						new BiomeState(BIOMES.BEACH, 2),
						new BiomeState(BIOMES.COASTAL, 3),
						new BiomeState(BIOMES.URBAN, 2),
						new BiomeState(BIOMES.WETLANDS, 3)
					]
				)
			]
        ]
    )
};

function moveToNextCity() {
    if(game.currentCity === australia.TAS.regions[game.currentRegion].length -1) {
        game.currentCity = 0;
        game.currentRegion++;
        if (game.currentRegion > australia.TAS.regions.length - 1) {
            game.currentRegion = 0;
        }
        game.currentViewableRegion = game.currentRegion;
    }
    else
        game.currentCity++;
}

