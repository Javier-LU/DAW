package com.ESAD.ESAD.controllers.request;

import javax.validation.constraints.NotBlank;

public record AutLoginRequest(@NotBlank String username,@NotBlank String password) {
}
