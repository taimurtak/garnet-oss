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
package utils

import (
	"fmt"
	"os"
	"io/ioutil"
	"crypto/rand"
	"strings"
	"encoding/base64"
)

// Helper function to check if the given path exists
func CheckIfExists(path string) bool {
	if _, error := os.Stat(path); error != nil {
		return false
	}
	return true
}

// Helper function to determine the user's home directory
func HomeDirectory() string {
	homeDir, error := os.UserHomeDir()
	if error != nil {
		fmt.Print("Home directory not found")
	}
	return homeDir
}

// Helper function to write a given config to a temporary generated file and the back to the original 
func Write(filename string, configData []byte, mode os.FileMode) error {
	randomString, err := GenerateRandomStringURLSafe(32)
	
	if err != nil {
		panic(err)
	}

	generateFile:= fmt.Sprintf("%s.%s", filename, randomString)

	if err := ioutil.WriteFile(generateFile, configData, os.FileMode(mode)); err != nil {
		return err
	}

	if err := os.Rename(generateFile, filename); err != nil {
		_ = os.Remove(generateFile)
		return err
	}

	return nil
}

// Helper function that returns securely generated random bytes.
func GenerateRandomBytes(n int) ([]byte, error) {
	b := make([]byte, n)
	_, err := rand.Read(b)
	// Note that err == nil only if we read len(b) bytes.
	if err != nil {
		return nil, err
	}

	return b, nil
}

//Helper function that returns a URL-safe, base64 encoded securely generated random string.
func GenerateRandomStringURLSafe(n int) (string, error) {
	b, err := GenerateRandomBytes(n)
	return base64.URLEncoding.EncodeToString(b), err
}

//Helper function to get secret key from a file path
func key(str string, noPaths bool) string {
	sep := "/"
	if noPaths {
		sep = "."
	}
	tokens := strings.Split(str, sep)
	secretKey := tokens[len(tokens)-1]
	return secretKey
}

//Helper function to change Config values from the Garnet backend into names of environment variables
func SecretToEnv(str string, noPaths bool) string {
	return NormalizeVar(key(str, noPaths))
}

/// Helper function to normalize environment variable name 
func NormalizeVar(str string) string {
	//return strings.Replace(strings.ToUpper(str), "-", "_", -1)
	return str
}