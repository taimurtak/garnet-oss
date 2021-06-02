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

type configObject struct {
    Scope   	  []string `json:"scope"`
	Id            string `json:"_id"`
	ProjectName   []string `json:"projectName"`
	SecretValue   string `json:"variableValue"`
	SecretKey     string `json:"variableName"`
    TenantID      string `json:"tenant"`
    CreatedBy     string `json:"createdBy"`
	UpdatedBy     string `json:"updatedBy"`
	CreatedAt     string `json:"createdAt"`
    UpdatedAt     string `json:"updatedAt"`
    V             int    `json:"__v"`
}

type ConfigFile struct {
	Token       string  
	TenantID    string 
	Host 		string 
}

// A secret without metadata (just variableValue and variableName)
type BareSecret struct {
	Value string
	Key   string
}


type Backend interface {
	ListSecrets(project string) ([]BareSecret, error)
	// other CRUD methods get added here
}

