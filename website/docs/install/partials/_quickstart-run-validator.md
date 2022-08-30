import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Next, we'll create your validator keys with the [Ethereum Staking Deposit CLI](https://github.com/ethereum/staking-deposit-cli).

Download the latest stable version of the deposit CLI from the [Staking Deposit CLI Releases page](https://github.com/ethereum/staking-deposit-cli/releases).

<Tabs groupId="os" defaultValue="others" values={[
    {label: 'Windows', value: 'win'},
    {label: 'Linux, MacOS, Arm64', value: 'others'}
]}>
  <TabItem value="win">
    <p>Run the following command to create your mnemonic (a unique and <strong>highly sensitive</strong> 24-word phrase) and keys:</p>
    <Tabs groupId="network" defaultValue="mainnet" values={[
        {label: 'Mainnet', value: 'mainnet'},
        {label: 'Goerli-Prater', value: 'goerli-prater'},
        {label: 'Ropsten', value: 'ropsten'}
    ]}>
      <TabItem value="mainnet">
        <pre><code>deposit.exe new-mnemonic --num_validators=1 --mnemonic_language=english</code></pre>
      </TabItem>
      <TabItem value="goerli-prater">
        <pre><code>deposit.exe new-mnemonic --num_validators=1 --mnemonic_language=english --chain=prater</code></pre>
      </TabItem>
      <TabItem value="ropsten">
        <pre><code>deposit.exe new-mnemonic --num_validators=1 --mnemonic_language=english --chain=ropsten</code></pre>
      </TabItem>
    </Tabs>
    <p>Follow the CLI prompts to generate your keys. This will give you the following artifacts:</p>
    <ol>
      <li>A <strong>new mnemonic seed phrase</strong>. This is <strong>highly sensitive</strong> and should never be exposed to other people or networked hardware.</li>
      <li>A <code>validator_keys</code> folder. This folder will contain two files:
        <ol>
          <li><code>deposit_data-*.json</code> - contains deposit data that you’ll later upload to the Ethereum launchpad.</li>
          <li><code>keystore-m_*.json</code> - contains your public key and encrypted private key.</li>
        </ol>
      </li>
    </ol>
    <p>Copy the <code>validator_keys</code> folder to your primary machine's <code>consensus</code> folder. Run the following command to import your keystores, replacing <code>&lt;YOUR_FOLDER_PATH&gt;</code> with the full path to your <code>consensus/validator_keys</code> folder:</p>
    <Tabs groupId="network" defaultValue="mainnet" values={[
        {label: 'Mainnet', value: 'mainnet'},
        {label: 'Goerli-Prater', value: 'goerli-prater'},
        {label: 'Ropsten', value: 'ropsten'}
    ]}>
      <TabItem value="mainnet">
        <pre><code>prysm.bat validator accounts import --keys-dir=&lt;YOUR_FOLDER_PATH&gt;</code></pre>
        <p>You’ll be prompted to specify a wallet directory twice. Provide the path to your <code>consensus</code> folder for both prompts. You should see <code>Successfully imported 1 accounts, view all of them by running accounts list</code> when your account has been successfully imported into Prysm.</p>
        <p>Next, go to the <a href='https://launchpad.ethereum.org/en/upload-deposit-data'>Mainnet Launchpad’s deposit data upload page</a> and upload your <code>deposit_data-*.json</code> file. You’ll be prompted to connect your wallet.</p>
        <p>You can then deposit 32 ETH into the Mainnet deposit contract via the Launchpad page. Exercise extreme caution throughout this procedure.</p> 
        <p>Finally, run the following command to start your validator, replacing <code>&lt;YOUR_FOLDER_PATH&gt;</code> with the full path to your <code>consensus</code> folder:</p>
        <pre><code>prysm.bat validator --wallet-dir=&lt;YOUR_FOLDER_PATH&gt;</code></pre>
      </TabItem>
      <TabItem value="goerli-prater">
        <pre><code>prysm.bat validator accounts import --keys-dir=&lt;YOUR_FOLDER_PATH&gt; --prater</code></pre>
        <p>You’ll be prompted to specify a wallet directory twice. Provide the path to your <code>consensus</code> folder for both prompts. You should see <code>Successfully imported 1 accounts, view all of them by running accounts list</code> when your account has been successfully imported into Prysm.</p>
        <p>Next, go to the <a href='https://goerli.launchpad.ethereum.org/en/upload-deposit-data'>Goerli-Prater Launchpad’s deposit data upload page</a> and upload your <code>deposit_data-*.json</code> file. You’ll be prompted to connect your wallet.</p>
        <p>If you need GöETH, head over to one of the following Discord servers:</p>
        <ul>
          <li><a href='https://discord.io/ethstaker'>r/EthStaker Discord</a></li>
          <li><a href='https://discord.gg/prysmaticlabs'>Prysm Discord server</a></li>
        </ul>
        <p>Someone should be able to give you the GöETH you need. You can then deposit 32 GöETH into the Prater testnet’s deposit contract via the Launchpad page. Exercise extreme caution throughout this procedure - <strong>never send real ETH to the testnet deposit contract.</strong> Finally, run the following command to start your validator, replacing <code>&lt;YOUR_FOLDER_PATH&gt;</code> with the full path to your <code>consensus</code> folder:</p>
        <pre><code>prysm.bat validator --wallet-dir=&lt;YOUR_FOLDER_PATH&gt; --prater</code></pre>      
      </TabItem>
      <TabItem value="ropsten">
        <pre><code>prysm.bat validator accounts import --keys-dir=&lt;YOUR_FOLDER_PATH&gt; --ropsten</code></pre>
        <p>You’ll be prompted to specify a wallet directory twice. Provide the path to your <code>consensus</code> folder for both prompts. You should see <code>Successfully imported 1 accounts, view all of them by running accounts list</code> when your account has been successfully imported into Prysm.</p>
        <p>Next, go to the <a href='https://ropsten.launchpad.ethereum.org/en/upload-deposit-data'>Ropsten Launchpad’s deposit data upload page</a> and upload your <code>deposit_data-*.json</code> file. You’ll be prompted to connect your wallet.</p>
        <p>If you need rEth, head over to one of the following Discord servers:</p>
        <ul>
          <li><a href='https://discord.io/ethstaker'>r/EthStaker Discord</a></li>
          <li><a href='https://discord.gg/prysmaticlabs'>Prysm Discord server</a></li>
        </ul>
        <p>Someone should be able to give you the rETH you need. You can then deposit 32 rETH into the Ropsten testnet’s deposit contract via the Launchpad page. Exercise extreme caution throughout this procedure - <strong>never send real ETH to the testnet deposit contract.</strong> Finally, run the following command to start your validator, replacing <code>&lt;YOUR_FOLDER_PATH&gt;</code> with the full path to your <code>consensus</code> folder:</p>
        <pre><code>prysm.bat validator --wallet-dir=&lt;YOUR_FOLDER_PATH&gt; --ropsten</code></pre>      
      </TabItem>
    </Tabs>
  </TabItem>
  <TabItem value="others">
    <p>Run the following command to create your mnemonic phrase and keys:</p>
    <Tabs groupId="network" defaultValue="mainnet" values={[
        {label: 'Mainnet', value: 'mainnet'},
        {label: 'Goerli-Prater', value: 'goerli-prater'},
        {label: 'Ropsten', value: 'ropsten'}
    ]}>
      <TabItem value="mainnet">
        <pre><code>./deposit new-mnemonic --num_validators=1 --mnemonic_language=english</code></pre>
      </TabItem>
      <TabItem value="goerli-prater">
        <pre><code>./deposit new-mnemonic --num_validators=1 --mnemonic_language=english --chain=prater</code></pre>
      </TabItem>
      <TabItem value="ropsten">
        <pre><code>./deposit new-mnemonic --num_validators=1 --mnemonic_language=english --chain=ropsten</code></pre>
      </TabItem>
    </Tabs>
    <p>Follow the CLI prompts to generate your keys. This will give you the following artifacts:</p>
    <ol>
      <li>A <strong>new mnemonic seed phrase</strong>. This is <strong>highly sensitive</strong> and should never be exposed to other people or networked hardware.</li>
      <li>A <code>validator_keys</code> folder. This folder will contain two files:
        <ol>
          <li><code>deposit_data-*.json</code> - contains deposit data that you’ll later upload to the Ethereum launchpad.</li>
          <li><code>keystore-m_*.json</code> - contains your public key and encrypted private key.</li>
        </ol>
      </li>
    </ol>
    <p>Copy the <code>validator_keys</code> folder to your primary machine's <code>consensus</code> folder. Run the following command to import your keystores, replacing <code>&lt;YOUR_FOLDER_PATH&gt;</code> with the full path to your <code>consensus/validator_keys</code> folder:</p>
    <Tabs groupId="network" defaultValue="mainnet" values={[
        {label: 'Mainnet', value: 'mainnet'},
        {label: 'Goerli-Prater', value: 'goerli-prater'},
        {label: 'Ropsten', value: 'ropsten'}
    ]}>
      <TabItem value="mainnet">
        <pre><code>./prysm.sh validator accounts import --keys-dir=&lt;YOUR_FOLDER_PATH&gt;</code></pre>
        <p>You’ll be prompted to specify a wallet directory twice. Provide the path to your <code>consensus</code> folder for both prompts. You should see <code>Successfully imported 1 accounts, view all of them by running accounts list</code> when your account has been successfully imported into Prysm.</p>
        <p>Next, go to the <a href='https://launchpad.ethereum.org/en/upload-deposit-data'>Mainnet Launchpad’s deposit data upload page</a> and upload your <code>deposit_data-*.json</code> file. You’ll be prompted to connect your wallet.</p>
        <p>You can then deposit 32 ETH into the Mainnet deposit contract via the Launchpad page. Exercise extreme caution throughout this procedure. Finally, run the following command to start your validator, replacing <code>&lt;YOUR_FOLDER_PATH&gt;</code> with the full path to your <code>consensus</code> folder:</p>
        <pre><code>./prysm.sh validator --wallet-dir=&lt;YOUR_FOLDER_PATH&gt;</code></pre>
      </TabItem>
      <TabItem value="goerli-prater">
        <pre><code>./prysm.sh validator accounts import --keys-dir=&lt;YOUR_FOLDER_PATH&gt; --prater</code></pre>
        <p>You’ll be prompted to specify a wallet directory twice. Provide the path to your <code>consensus</code> folder for both prompts. You should see <code>Successfully imported 1 accounts, view all of them by running accounts list</code> when your account has been successfully imported into Prysm.</p>
        <p>Next, go to the <a href='https://goerli.launchpad.ethereum.org/en/upload-deposit-data'>Goerli-Prater Launchpad’s deposit data upload page</a> and upload your <code>deposit_data-*.json</code> file. You’ll be prompted to connect your wallet.</p>
        <p>If you need GöETH, head over to one of the following Discord servers:</p>
        <ul>
          <li><a href='https://discord.io/ethstaker'>r/EthStaker Discord</a></li>
          <li><a href='https://discord.gg/prysmaticlabs'>Prysm Discord server</a></li>
        </ul>
        <p>Someone should be able to give you the GöETH you need. You can then deposit 32 GöETH into the Prater testnet’s deposit contract via the Launchpad page. Exercise extreme caution throughout this procedure - <strong>never send real ETH to the testnet deposit contract.</strong>  Finally, run the following command to start your validator, replacing <code>&lt;YOUR_FOLDER_PATH&gt;</code> with the full path to your <code>consensus</code> folder:</p>
        <pre><code>./prysm.sh validator --wallet-dir=&lt;YOUR_FOLDER_PATH&gt; --prater</code></pre>    
      </TabItem>
      <TabItem value="ropsten">
        <pre><code>./prysm.sh validator accounts import --keys-dir=&lt;YOUR_FOLDER_PATH&gt; --ropsten</code></pre>
        <p>You’ll be prompted to specify a wallet directory twice. Provide the path to your <code>consensus</code> folder for both prompts. You should see <code>Successfully imported 1 accounts, view all of them by running accounts list</code> when your account has been successfully imported into Prysm.</p>
        <p>Next, go to the <a href='https://ropsten.launchpad.ethereum.org/en/upload-deposit-data'>Ropsten Launchpad’s deposit data upload page</a> and upload your <code>deposit_data-*.json</code> file. You’ll be prompted to connect your wallet.</p>
        <p>If you need rETH, head over to one of the following Discord servers:</p>
        <ul>
          <li><a href='https://discord.io/ethstaker'>r/EthStaker Discord</a></li>
          <li><a href='https://discord.gg/prysmaticlabs'>Prysm Discord server</a></li>
        </ul>
        <p>Someone should be able to give you the rETH you need. You can then deposit 32 rETH into the Ropsten testnet’s deposit contract via the Launchpad page. Exercise extreme caution throughout this procedure - <strong>never send real ETH to the testnet deposit contract.</strong>  Finally, run the following command to start your validator, replacing <code>&lt;YOUR_FOLDER_PATH&gt;</code> with the full path to your <code>consensus</code> folder:</p>
        <pre><code>./prysm.sh validator --wallet-dir=&lt;YOUR_FOLDER_PATH&gt; --ropsten</code></pre>    
      </TabItem>
    </Tabs>
  </TabItem>
</Tabs>

:::tip Congratulations! 

You’re now running a <strong>full Ethereum node</strong> and a <strong>validator</strong>.

:::

It can a long time (from days to months) for your validator to become fully activated. To learn more about the validator activation process, see [Deposit Process](https://kb.beaconcha.in/ethereum-2.0-depositing). See [Check node and validator status](../monitoring/checking-status.md) for detailed status monitoring guidance.

You can leave your **execution client**, **beacon node**, and **validator client** terminal windows open and running. Once your validator is activated, it will automatically begin proposing and validating blocks.