pragma solidity >=0.6.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./utils/IUniswapV2Factory.sol";


contract ExerciceSolution {
    
    constructor(address _wethAddress, address _ERC20SolutionAddress, IUniswapV2Factory _uniswapV2Factory) public {
        
        owner = msg.sender;
        wethAddress = _wethAddress;
        myTokenAddress = _myTokenAddress;
        uniswapV2Factory = IUniswapV2Factory(_uniswapV2Factory);
	}

	function addLiquidity() external{

    }

	function withdrawLiquidity() external{
        
    }

	function swapYourTokenForDummyToken() external{
        
    }

	function swapYourTokenForEth() external{
        
    }
}
