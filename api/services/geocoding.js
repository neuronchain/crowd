var Promise = require('bluebird');

module.exports = {
    parseAddress: function (model) {
        const Address = sails.models['geocoding/address'];
        return new Promise((resolve, reject) => {
            if (!model) {
                throw 'NOT_ALL_FIELDS_ARE_FILLED';
            }
            if (typeof model === 'object') {
                this.parseLocality(model.locality).then(locality => {
                    model.locality = locality;
                    return this.parsePostalCode(model.postalCode);
                }).then(postalCode => {
                    model.postalCode = postalCode;
                    if (model.id && Number.isInteger(model.id) && model.street && model.building && model.apartment && model.postalCode) {
                        return Address.findOne({ id: model.id });
                    } else if (model.street && model.building && model.apartment && model.postalCode) {
                        return Address.findOrCreate({
                            street: model.street,
                            building: model.building,
                            apartment: model.apartment,
                            postalCode: model.postalCode,
                            locality: model.locality
                        },
                            {
                                street: model.street,
                                building: model.building,
                                apartment: model.apartment,
                                postalCode: model.postalCode,
                                locality: model.locality
                            });
                    } else {
                        throw 'WRONG_REQUEST_DATA';
                    }
                }).then(foundOrCreated => {
                    if (foundOrCreated instanceof Array) foundOrCreated = foundOrCreated[0];
                    if (foundOrCreated.street != model.street || foundOrCreated.building != model.building || foundOrCreated.apartment != model.apartment || foundOrCreated.postalCode != model.postalCode) {
                        return Address.update({
                            id: foundOrCreated.id
                        }, {
                                street: model.street,
                                building: model.building,
                                apartment: model.apartment,
                                postalCode: model.postalCode
                            })
                    } else {
                        resolve(foundOrCreated.id);
                        throw ('stop');
                    }
                }).then(updated => {
                    resolve(updated[0].id);
                }).catch(err => {
                    if (err == 'stop') {
                        return;
                    } else {
                        reject(err);
                    }
                })
            } else {
                if (Number.isInteger(model)) {
                    resolve(model);
                } else {
                    throw 'WRONG_REQUEST_DATA';
                }
            }
        })
    },
    parseLocality: function (model) {
        const Locality = sails.models['geocoding/locality'];
        return new Promise((resolve, reject) => {
            if (!model) {
                throw 'NOT_ALL_FIELDS_ARE_FILLED';
            }
            if (typeof model === 'object') {
                return this.parseRegion(model.region).then(region => {
                    model.region = region;
                    if (model.id && Number.isInteger(model.id) && model.name) {
                        Locality.findOne({ id: model.id });
                    } if (model.name) {
                        return Locality.findOrCreate({
                            region: model.region,
                            name: model.name
                        },
                            {
                                region: model.region,
                                name: model.name
                            });
                    } else {
                        throw 'WRONG_REQUEST_DATA';
                    }
                }).then(foundOrCreated => {
                    if (foundOrCreated instanceof Array) foundOrCreated = foundOrCreated[0];
                    if (foundOrCreated.region != model.region || foundOrCreated.name != model.name) {
                        return Locality.update({ id: model.id }, { region: model.region, name: model.name });
                    } else {
                        resolve(foundOrCreated.id);
                        throw 'stop';
                    }
                }).then(updated => {
                    resolve(updated[0].id);
                }).catch(err => {
                    if (err == 'stop') {
                        return;
                    } else {
                        reject(err);
                    }
                })
            } else {
                if (Number.isInteger(model)) {
                    resolve(model);
                } else {
                    throw 'WRONG_REQUEST_DATA';
                }
            }
        })
    },
    parseRegion: function (model) {
        const Region = sails.models['geocoding/region'];
        return new Promise((resolve, reject) => {
            if (!model) {
                throw 'NOT_ALL_FIELDS_ARE_FILLED'
            }
            if (typeof model === 'object') {
                return this.parseCountry(model.country).then(country => {
                    model.country = country;
                    if (model.id && Number.isInteger(model.id) && model.name) {
                        return Region.findOne({ id: model.id });
                    } else if (model.name) {
                        return Region.findOrCreate({
                            name: model.name,
                            country: model.country
                        }, {
                                name: model.name,
                                country: model.country
                            });
                    } else {
                        throw 'WRONG_REQUEST_DATA';
                    }
                }).then(foundOrCreated => {
                    if (foundOrCreated instanceof Array) foundOrCreated = foundOrCreated[0];
                    if (foundOrCreated.country != model.country || foundOrCreated.name != model.name) {
                        return Region.update({ id: model.id }, { country: model.country, name: model.name });
                    } else {
                        resolve(foundOrCreated.id);
                        throw 'stop';
                    }
                }).then(updated => {
                    return resolve(updated[0].id);
                }).catch(err => {
                    if (err == 'stop') {
                        return;
                    } else {
                        reject(err);
                    }
                })
            } else {
                if (Number.isInteger(model)) {
                    resolve(model);
                } else {
                    throw 'WRONG_REQUEST_DATA';
                }
            }
        })
    },
    parseCountry: function (model) {
        const Country = sails.models['geocoding/country'];
        return new Promise((resolve, reject) => {
            if (!model) {
                throw 'NOT_ALL_FIELDS_ARE_FILLED'
            }
            if (typeof model === 'object') {
                if (model.id && Number.isInteger(model.id) && model.name && model.ISOAlpha2 && model.ISOAlpha3) {
                    return Country.findOne({ id: model.id });
                } else if (model.name && model.ISOAlpha2 && model.ISOAlpha3) {
                    Country.findOrCreate({
                        name: model.name,
                        ISOAlpha2: model.ISOAlpha2,
                        ISOAlpha3: model.ISOAlpha3
                    }, {
                            name: model.name,
                            ISOAlpha2: model.ISOAlpha2,
                            ISOAlpha3: model.ISOAlpha3
                        }).then(foundOrCreated => {
                            if (foundOrCreated instanceof Array) foundOrCreated = foundOrCreated[0];
                            if (foundOrCreated.ISOAlpha2 != model.ISOAlpha2 || foundOrCreated.ISOAlpha3 != model.ISOAlpha3 || foundOrCreated.name != model.name) {
                                return Country.update({ id: model.id }, { ISOAlpha2: model.ISOAlpha2, ISOAlpha3: model.ISOAlpha3, name: model.name });
                            } else {
                                resolve(foundOrCreated.id);
                                throw 'stop';
                            }
                        }).then(updated => {
                            resolve(updated[0].id);
                        }).catch(err => {
                            if (err == 'stop') {
                                return;
                            } else {
                                reject(err);
                            }
                        })
                } else {
                    throw 'WRONG_REQUEST_DATA';
                }
            } else {
                if (Number.isInteger(model)) {
                    resolve(model);
                } else {
                    throw 'WRONG_REQUEST_DATA';
                }
            }
        })
    },
    parsePostalCode: function (model) {
        const PostalCode = sails.models['geocoding/postalcode'];
        return new Promise((resolve, reject) => {
            if (!model) {
                throw 'NOT_ALL_FIELDS_ARE_FILLED';
            }
            if (typeof model === 'object') {
                return this.parseLocality(model.locality).then(locality => {
                    model.locality = locality;
                    if (model.id && Number.isInteger(model.id) && model.number) {
                        return PostalCode.findOne({ id: model.id });
                    } else if (model.number) {
                        return PostalCode.findOrCreate(
                            {
                                number: model.number
                            },
                            {
                                locality: model.locality,
                                number: model.number
                            })
                    } else {
                        throw 'WRONG_REQUEST_DATA';
                    }
                }).then(foundOrCreated => {
                    if (foundOrCreated instanceof Array) foundOrCreated = foundOrCreated[0];
                    if (foundOrCreated.locality != model.locality || foundOrCreated.number != model.number) {
                        return PostalCode.update({ id: foundOrCreated.id }, { locality: model.locality, number: model.number });
                    } else {
                        resolve(foundOrCreated.id);
                        throw 'stop';
                    }
                }).then(updated => {
                    resolve(updated[0].id);
                }).catch(err => {
                    if (err = 'stop') {
                        return;
                    } else {
                        reject(err);
                    }
                })
            } else {
                if (Number.isInteger(model)) {
                    resolve(model);
                } else {
                    throw 'WRONG_REQUEST_DATA';
                }
            }
        })
    },
    populateGeocoding: (data) => {
        return new Promise((resolve, reject) => {
            if (data instanceof Array) {
                Promise.map(data, model => {
                    return geocoding.populateGeocoding(model);
                }).then(data => {
                    resolve(data);
                })
            } else {
                if (data.locality) {
                    geocoding.populateLocality(data).then(data => {
                        resolve(data);
                    });
                } else {
                    resolve(data);
                }
            }
        })
    },
    populateLocality: (data) => {
        const Locality = sails.models['geocoding/locality'];
        return new Promise((resolve, reject) => {
            if (typeof data.locality == 'object') {
                geocoding.populateRegion(data.locality).then(populated => {
                    data.locality = populated;
                    resolve(data);
                }).catch(err => {
                    reject(err);
                })
            } else {
                if (Number.isInteger(data.locality)) {
                    Locality.findOne({id : data}).populate('region').then(found => {
                        data.locality = found;
                        return geocoding.populateRegion(found);
                    }).then(populated => {
                        data.locality.region = populated;
                        resolve(data);
                    }).catch(err => {
                        reject(err);
                    })
                } else {
                    reject('INTERNAL_ERROR');
                }
            }
        })
    },
    populateRegion: (data) => {
        const Region = sails.models['geocoding/region'];
        return new Promise((resolve, reject) => {
            if (typeof data.region == 'object') {
                geocoding.populateCountry(data.region.country).then(populated => {
                    data.region.country = populated;
                    resolve(data);
                }).catch(err => {
                    reject(err);
                })
            } else {
                if (Number.isInteger(data.region)) {
                    Region.findOne({id : data.region}).populate('country').then(found => {
                        data.region = found;
                        resolve(data);
                    }).catch(err => {
                        reject(err);
                    })
                } else {
                    reject('INTERNAL_ERROR');
                }
            }
        })
    },
    populateCountry: (data) => {
        const Country = sails.models['geocoding/country'];
        return new Promise((resolve, reject) => {
            if (typeof data.country == 'object') {
                resolve(data);
            } else {
                if (Number.isInteger(data)) {
                    Country.findOne({id : data.country}).then(found => {
                        resolve(found)
                    });
                } else {
                    reject('INTERNAL_ERROR');
                }
            }
        })
    }
}