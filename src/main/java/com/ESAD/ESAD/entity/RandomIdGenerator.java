package com.ESAD.ESAD.entity;

import java.io.Serializable;
import java.util.Random;

import org.hibernate.engine.spi.SharedSessionContractImplementor;
import org.hibernate.id.IdentifierGenerator;

public class RandomIdGenerator implements IdentifierGenerator {

    private static final Random RANDOM = new Random();

    @Override
    public Serializable generate(SharedSessionContractImplementor session, Object object) {
        return RANDOM.nextInt(Integer.MAX_VALUE);
    }
}
