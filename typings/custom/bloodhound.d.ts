//There's no Typescript typing definition for the typeahead bloodhound engine
//We can just create a simple one accepting any format so Typescript at least know
//that this object exist. Eventually, we could create a real type definition

declare var Bloodhound: any;