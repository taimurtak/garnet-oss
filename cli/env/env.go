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
package env

import (
	"strings"
	"github.com/garnet-labs/garnet-cli/backend"
	"github.com/garnet-labs/garnet-cli/utils"
)

// environment is a slice of strings representing the local environment, in the form "key=value".
type Environment []string

func (e *Environment) inject(s backend.Backend, project string, noPaths bool) error {
	bareSecrets, err := s.ListSecrets(strings.ToLower(project))
	if err != nil {
		return err
	}
	
	envVarKeys := make([]string, 0)
	for _, bareSecret := range bareSecrets {
		envVarKey := utils.SecretToEnv(bareSecret.Key, noPaths)

		envVarKeys = append(envVarKeys, envVarKey)

		e.Set(envVarKey, bareSecret.Value)
	}
	return nil
}

func (e *Environment) Inject(s backend.Backend, project string) error {
	return e.inject(s, project, false)
}


// Helper fucntion to unset an environment variable by key
func (e *Environment) Unset(key string) {
	for i := range *e {
		if strings.HasPrefix((*e)[i], key+"=") {
			(*e)[i] = (*e)[len(*e)-1]
			*e = (*e)[:len(*e)-1]
			break
		}
	}
}

// Helper function to add an environment variable, replacing any existing ones of the same key
func (e *Environment) Set(key, val string) {
	e.Unset(key)
	*e = append(*e, key+"="+val)
}