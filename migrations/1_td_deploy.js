const Str = require('@supercharge/strings')
// const BigNumber = require('bignumber.js');

var TDErc20 = artifacts.require("ERC20TD.sol");
var ERC20 = artifacts.require("DummyToken.sol"); 
var evaluator = artifacts.require("Evaluator.sol");
var ERC20solution = artifacts.require("ERC20Solution.sol");

module.exports = (deployer, network, accounts) => {
    deployer.then(async () => {
        //await deployTDToken(deployer, network, accounts); 
        //await deployEvaluator(deployer, network, accounts); 
        //await setPermissionsAndRandomValues(deployer, network, accounts); 
        //await deployRecap(deployer, network, accounts); 
		await hardcodeContractAddress(deployer, network, accounts)
		await deployment(deployer, network, accounts); 
    });
};

async function deployTDToken(deployer, network, accounts) {
	TDToken = await TDErc20.new("TD-AMM-101","TD-AMM-101",web3.utils.toBN("20000000000000000000000000000"))
	dummyToken = await ERC20.new("dummyToken", "DTK", web3.utils.toBN("2000000000000000000000000000000"))
	uniswapV2FactoryAddress = "0x5c69bee701ef814a2b6a3edd4b1652cb9cc5aa6f"
	wethAddress = "0xc778417e063141139fce010982780140aa0cd5ab"
}

async function deployEvaluator(deployer, network, accounts) {
	Evaluator = await evaluator.new(TDToken.address, dummyToken.address, uniswapV2FactoryAddress, wethAddress)
}

async function setPermissionsAndRandomValues(deployer, network, accounts) {
	await TDToken.setTeacher(Evaluator.address, true)
	randomSupplies = []
	randomTickers = []
	for (i = 0; i < 20; i++)
		{
		randomSupplies.push(Math.floor(Math.random()*1000000000))
		randomTickers.push(Str.random(5))
		// randomTickers.push(web3.utils.utf8ToBytes(Str.random(5)))
		// randomTickers.push(Str.random(5))
		}

	console.log(randomTickers)
	console.log(randomSupplies)
	// console.log(web3.utils)
	// console.log(type(Str.random(5)0)
	await Evaluator.setRandomTickersAndSupply(randomSupplies, randomTickers);
}

async function hardcodeContractAddress(deployer, network, accounts) {
	TDToken = await TDErc20.at("0xc2269af51350796aF4F6D52e4736Db3A885F28D6")
	DummyToken = await ERC20.at("0xbc3b69d1abD5A39f55a9Ba50C7a2aDd933952123")
	Evaluator = await evaluator.at("0x89a2Faa44066e94CE6B6D82927b0bbbb8709eEd7")
}

async function deployRecap(deployer, network, accounts) {
	console.log("TDToken " + TDToken.address)
	console.log("dummyToken " + dummyToken.address)
	console.log("Evaluator " + Evaluator.address)
}

async function deployment(deployer, network, accounts) {

	i=0;
	getBalance = await TDToken.balanceOf(accounts[i]);
	console.log("Init Balance " + getBalance.toString());
		
	// ExInit
	a = await Evaluator.dummyToken({from: accounts[i]});
	console.log(a);
	getBalance = await TDToken.balanceOf(accounts[i]);
	console.log("ExInit Balance " + getBalance.toString());

	// Ex1
	// await Evaluator.ex1_showIHaveTokens({from: accounts[i]});
	// getBalance = await TDToken.balanceOf(accounts[i]);
	// console.log("Ex1 Balance " + getBalance.toString());
	
	// await Evaluator.submitExercice(Solution.address)
	
	// Ex2
	// await Evaluator.ex2_showIProvidedLiquidity({from: accounts[i]});
	// getBalance = await TDToken.balanceOf(accounts[i]);
	// console.log("Ex2 Balance " + getBalance.toString());

	// Ex6a
	await Evaluator.ex6a_getTickerAndSupply({from: accounts[i]});
	getBalance = await TDToken.balanceOf(accounts[i]);
	console.log("Ex6a Balance " + getBalance.toString());
	
	ticker = await Evaluator.readTicker(accounts[i]);
	console.log(ticker);
	supply = await Evaluator.readSupply(accounts[i]);
	console.log(supply.toString());

	// Ex6b
	ERC20Solution = await ERC20solution.new(ticker, ticker, supply.toString());
	await Evaluator.submitErc20(ERC20Solution.address, {from: accounts[i]});

	console.log(ERC20Solution.address);

	await Evaluator.ex6b_testErc20TickerAndSupply({from: accounts[i]});
	getBalance = await TDToken.balanceOf(accounts[i]);
	console.log("Ex6b Balance " + getBalance.toString());
	
	wethAddress = "0xc778417e063141139fce010982780140aa0cd5ab"
	uniswapV2FactoryAddress = "0x5c69bee701ef814a2b6a3edd4b1652cb9cc5aa6f"
	ExerciceSolution = await exerciceSolution.new(ERC20Solution.address, weth, uniswapV2FactoryAddress)
	// Ex7
	await Evaluator.ex7_tokenIsTradableOnUniswap({from: accounts[i]});
	getBalance = await TDToken.balanceOf(accounts[i]);
	console.log("Ex7 Balance " + getBalance.toString());

	
}