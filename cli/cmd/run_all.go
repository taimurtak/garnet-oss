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
// +build !linux,!darwin
package cmd

import (
	"os"
	osexec "os/exec"
	"os/signal"
	"syscall"
	"github.com/pkg/errors"
)

// exec executes the given command, passing it args and setting its environment to env.
// The exec function is allowed to never return and cause the program to exit.

func run_all(command string, args []string, env []string) error {
	ecmd := osexec.Command(command, args...)
	ecmd.Stdin = os.Stdin
	ecmd.Stdout = os.Stdout
	ecmd.Stderr = os.Stderr
	ecmd.Env = env

	sigChan := make(chan os.Signal, 1)
	signal.Notify(sigChan)

	if err := ecmd.Start(); err != nil {
		return errors.Wrap(err, "Run command failed")
	}

	go func() {
		for {
			sig := <-sigChan
			ecmd.Process.Signal(sig)
		}
	}()

	if err := ecmd.Wait(); err != nil {
		ecmd.Process.Signal(os.Kill)
		return errors.Wrap(err, "Command did not terminate")
	}

	waitStatus := ecmd.ProcessState.Sys().(syscall.WaitStatus)
	os.Exit(waitStatus.ExitStatus())
	return nil
}