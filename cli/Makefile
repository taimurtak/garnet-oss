# Copyright © 2021 Garnet Labs <support@usegarnet.com>
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at:
#
# 	http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
# -----------------------------------------------------
# Portions derived from Segment's chamber code.
#
# Copyright (c) 2017 Segment.
# Chamber is licensed under the terms of the MIT license.  
# For a copy, see <https://opensource.org/licenses/MIT>.

ifndef VERSION
	VERSION := $(shell git describe --tags --always --dirty="")
endif

LDFLAGS := -ldflags='-X "main.Version=$(VERSION)"'

build: garnet

garnet:
	CGO_ENABLED=0 go build -trimpath $(LDFLAGS) -o $@

all: dist/garnet-$(VERSION)-darwin-amd64 dist/garnet-$(VERSION)-darwin-arm64 dist/garnet-$(VERSION)-linux-amd64 dist/garnet-$(VERSION)-windows-amd64.exe

test:
	go test -v ./...

clean:
	rm -rf ./dist

dist/:
	mkdir -p dist

dist/garnet-$(VERSION)-darwin-amd64: | dist/
	GOOS=darwin GOARCH=amd64 CGO_ENABLED=0 go build -trimpath $(LDFLAGS) -o $@

dist/garnet-$(VERSION)-darwin-arm64: | dist/
	GOOS=darwin GOARCH=amd64 CGO_ENABLED=0 go build -trimpath $(LDFLAGS) -o $@

linux: dist/garnet-$(VERSION)-linux-amd64
	cp $^ garnet

dist/garnet-$(VERSION)-linux-amd64: | dist/
	GOOS=linux GOARCH=amd64 CGO_ENABLED=0 go build -trimpath $(LDFLAGS) -o $@

dist/garnet-$(VERSION)-windows-amd64.exe: | dist/
	GOOS=windows GOARCH=amd64 CGO_ENABLED=0 go build -trimpath $(LDFLAGS) -o $@

.PHONY: clean all linux
