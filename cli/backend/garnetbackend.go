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
package backend

import (
	"net/http"
	"fmt"
	"encoding/json"
	"io/ioutil"
    "path/filepath"
    "os"
    "log"
    "strings"
    "errors"
    "github.com/garnet-labs/garnet-cli/utils"
)

var ConfigurationFile string 
var configName = "garnet.json"

var accessToken string 
var tenantID string 
var apiHost string

var baseDirectory string
var UserDirectory string 

//var _ Store = &GarnetStore{}

type GarnetBackend struct{}

func NewGarnetBackend() (*GarnetBackend, error) {
	return &GarnetBackend{}, nil
}

func (s *GarnetBackend) ListSecrets(project string) ([]BareSecret, error) {
    
    // All lower case for consistency
    projectenv := strings.ToLower(project)

	baseDirectory = utils.HomeDirectory()
	UserDirectory = filepath.Join(baseDirectory, ".garnet")
    ConfigurationFile = filepath.Join(UserDirectory, configName)
    
    garnetConfig := filepath.Dir(ConfigurationFile)
	if !utils.CheckIfExists(garnetConfig) {
        return []BareSecret{}, errors.New("User not logged in. Please login to run this command.")
    }
    
	file, _ := ioutil.ReadFile(ConfigurationFile)
	data := ConfigFile{}
	_ = json.Unmarshal([]byte(file), &data)
	tenantID = data.TenantID
    accessToken = data.Token
    apiHost = data.Host
    
    if accessToken=="" || tenantID=="" {
        return []BareSecret{}, errors.New("User not logged in. Please login to run this command.")
    }

	client := &http.Client{}
	
    req, err := http.NewRequest("GET", fmt.Sprintf("%s/api/tenant/%s/configurations/%s", apiHost, tenantID, projectenv), nil)
	if err != nil {
		fmt.Print("Something went wrong")
	}
 
	req.Header.Add("Accept", "application/json")
	req.Header.Add("Content-Type", "application/json")
	req.Header.Set("Authorization", fmt.Sprintf("Bearer %s", accessToken))
 
    // Perform HTTP request
	resp, err := client.Do(req)
	if err != nil { 
	    log.Fatalln(err)
	}

    // Read the response body
   	body, err := ioutil.ReadAll(resp.Body)
   	if err != nil {
      log.Fatalln(err)
	}
	   
    // Store body bytes into an interface Array 
    var obj []interface{}

    // Convert response body from bytes to map[string]interface
    json.Unmarshal(body, &obj)

    /// Logic for retreiving raw secrets from the response body 
    var keyVector []string
    var valueVector []string

    for _, record := range obj {
        if rec, ok := record.(map[string]interface{}); ok {
            for key, val := range rec {
                if key=="variableName" {
                    keyVector = append(keyVector, val.(string))
                }
                if key=="variableValue" {
                    valueVector = append(valueVector, val.(string))
                }
            }
        } 
    }

    secrets := []BareSecret{} 
    for index, val := range keyVector {
        s:= BareSecret{
            Key: val,
            Value: valueVector[index],
        }
        secrets = append(secrets, s)
    }
	return secrets, nil
}

// HomeDir get home directory
func HomeDir() string {
	dir, err := os.UserHomeDir()
	if err != nil {
		fmt.Print("Unable to determine home directory")
	}

	return dir
}