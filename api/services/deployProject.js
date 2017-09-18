var Web3 = require('web3');
var net = require('net');
var web3 = new Web3('ws://localhost:8545');

var apiconfig = sails.config.apiconfig;
const OWNER_ADDR = '0x20e0ea4c8aef10e7dc74155542ef96a9f769a4ae';
const OWNER_PASSWORD = '12345';

module.exports = {
    checkProject: (projectId) => {
        const Project = sails.models['projects/project'];
        const Row = sails.models['projects/row'];
        var foundProject;
        return Project.findOne({ id: projectId }).then(found => {
            if (!found) throw 'MODEL_NOT_FOUND';
            foundProject = found;
            return Row.findOne({ project: found.id });
        }).then(found => {
            if (!found) throw 'NOT_ALL_FIELDS_ARE_FILLED';
            if (!found.tokenName || !found.decimals || !found.lotCount || !found.lotNotional || !found.symbol) {
                throw 'NOT_ALL_FIELDS_ARE_FILLED';
            } else {
                return { project: foundProject, row: found };
            }
        })
    },
    contractDeploy: (project, row) => {
        var _initialAmount = row.lotCount;
        var _name = row.tokenName;
        var _symbol = row.symbol;
        var _decimals = row.decimals;
        var _price = row.lotNotional;
        const Project = sails.models['projects/project'];
        var contract = new web3.eth.Contract(contractAbi);
        return web3.eth.personal.unlockAccount(OWNER_ADDR, OWNER_PASSWORD).then(data => {
            return contract.deploy({
                arguments: [
                    _initialAmount,
                    _name,
                    _symbol,
                    _decimals,
                ],
                data: contractByte.byte
            }).estimateGas();
        }).then(gas => {
            return contract.deploy({
                arguments: [
                    _initialAmount,
                    _name,
                    _symbol,
                    _decimals,
                ],
                data: contractByte.byte
            }).send({
                from: OWNER_ADDR,
                gas: gas,
                gasLimit: '6000000'
            })
        }).then(data => {
            return Project.update({ id: project.id }, { contractAddr: data._address });
        }).then(updated => {
            return updated[0];
        })
    }
}