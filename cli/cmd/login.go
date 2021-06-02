/*
Copyright © 2021 Garnet Labs <support@usegarnet.com>

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at: 

	http://www.apache.org/licenses/LICENSE-2.0
	
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
package cmd

import (
	"fmt"
	"os"
	"strings"
	"path/filepath"
	"io/ioutil"
	"encoding/json"
	"net/http"
	"log"
	"errors"
	"github.com/spf13/cobra"
	"github.com/garnet-labs/garnet-cli/utils"
)

// loginCmd represents the login command
var loginCmd = &cobra.Command{
	Use:   "login <token>",
	Short: "Authenticate to Garnet",
	Args: func(cmd *cobra.Command, args []string) error {
		//accessToken = cmd.Flag("token").Value.String()
		if len(args) == 0 {
				return errors.New("Please provide a valid auth token")
				cmd.Help()
		}
		return nil
	},
	RunE: loginRun,
}

var ConfigurationFile string 
var configName = "garnet.json"

var tenantID string
var accessToken string 
var apiHost string
var accessBool bool = false

var baseDirectory string
var UserDirectory string 

type ConfigFile struct {
	Token       string  
	TenantID    string
	Host 		string  
}

func init() {
	baseDirectory = utils.HomeDirectory()
	UserDirectory = filepath.Join(baseDirectory, ".garnet")
	ConfigurationFile = filepath.Join(UserDirectory, configName)
	//loginCmd.Flags().StringVar(&accessToken, "token", "", "Authentication Token for login")
	rootCmd.AddCommand(loginCmd)
}

func loginRun(cmd *cobra.Command, args []string) error {
	
	apiHost = cmd.Flag("api-server-host").Value.String()
	accessToken = args[0] 

	// Creates Garnet config directory at ~/.garnet
	if !utils.CheckIfExists(UserDirectory) {
		err := os.Mkdir(UserDirectory, 0700)
		if err != nil {
			fmt.Sprintf("Could not create config directory %s", UserDirectory)
		}
	}

	// Check if the config directory exists or not  
	garnetConfig := filepath.Dir(ConfigurationFile)
	if !utils.CheckIfExists(garnetConfig) {
		fmt.Errorf("Configuration file directory does not exist %s", garnetConfig)
	}

	var err error
	tenantID, err = getTenantID(accessToken)
	if err != nil {
		return err
	}

	data:=ConfigFile {
		TenantID: tenantID,
		Token: accessToken,
		Host: apiHost,
	}

	// Creates garnet.json file and writes user config to it (Tenant ID, Token)
	file, _ := json.MarshalIndent(data, "", " ")
	_ = utils.Write(ConfigurationFile, file, 0777)

	return nil
}

func getTenantID(token string) (string, error) {
	
	apiHost = "http://localhost:8080"
	client := &http.Client{}
	req, err := http.NewRequest("GET", fmt.Sprintf("%s/api/auth/cli/login", apiHost), nil)

	req.Header.Add("Accept", "application/json")
	req.Header.Add("Content-Type", "application/json")
	req.Header.Set("Authorization", fmt.Sprintf("Bearer %s", token))

	resp, err := client.Do(req)
	if err != nil {
	  log.Fatalln(err)
	  accessBool = false
	} else {
		accessBool = true
	}
	
    //We Read the response body on the line below.
   	body, err := ioutil.ReadAll(resp.Body)
   	if err != nil {
      log.Fatalln(err)
	}

	//Convert the body to type string
	sb := string(body)
	if sb == "An error occurred" {
		accessBool = false
	}
	
	tenant := strings.Split(sb, " ")

	if accessBool == true {
		fmt.Print("Login succeeded")
	} else {
		return "", errors.New("Login failed. Please try using the updated Garnet token from your Garnet dashboard under your profile section, or contact support@usegarnet.com")
	}
	
	return tenant[0], nil
}
