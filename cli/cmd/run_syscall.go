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
-----------------------------------------------------
Portions derived from Segment's chamber code.

Copyright (c) 2017 Segment.
Chamber is licensed under the terms of the MIT license.  
For a copy, see <https://opensource.org/licenses/MIT>.
*/
// +build linux darwin
package cmd

import (
	osexec "os/exec"
	"syscall"
)

func run_syscall(command string, args []string, env []string) error {
	argv0, err := osexec.LookPath(command)
	if err != nil {
		return err
	}

	argv := make([]string, 0, 1+len(args))
	argv = append(argv, command)
	argv = append(argv, args...)

	return syscall.Exec(argv0, argv, env)
}