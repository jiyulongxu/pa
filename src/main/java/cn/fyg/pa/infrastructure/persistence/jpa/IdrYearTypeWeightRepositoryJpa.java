package cn.fyg.pa.infrastructure.persistence.jpa;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.stereotype.Repository;

import cn.fyg.pa.domain.model.yeartypeweight.IdrTypeWeight;
import cn.fyg.pa.domain.model.yeartypeweight.IdrYearTypeWeightRepository;
import cn.fyg.pa.domain.model.yeartypeweight.IdrYearTypeWeight;

@Repository
public class IdrYearTypeWeightRepositoryJpa implements IdrYearTypeWeightRepository{
	
	@PersistenceContext
	private EntityManager entityManager;

	@Override
	public IdrYearTypeWeight find(Long id) {
		return entityManager.find(IdrYearTypeWeight.class, id);
	}

	@Override
	public IdrYearTypeWeight save(IdrYearTypeWeight idrYearTypeWeight) {
		for(IdrTypeWeight idrTypeWeight:idrYearTypeWeight.getIdrTypeWeight()){
			idrTypeWeight.setIdrYearTypeWeight(idrYearTypeWeight);
		}
		IdrYearTypeWeight oldIdrYearTypeWeight=entityManager.find(IdrYearTypeWeight.class, idrYearTypeWeight.getYear());
		if(oldIdrYearTypeWeight==null){
			return create(idrYearTypeWeight);
		}
		return	update(idrYearTypeWeight,oldIdrYearTypeWeight);
	}

	private IdrYearTypeWeight update(IdrYearTypeWeight idrYearTypeWeight,
			IdrYearTypeWeight oldIdrYearTypeWeight) {
		Set<Long> typeWeightIdSet=new HashSet<Long>();
		for(IdrTypeWeight idrTypeWeight:idrYearTypeWeight.getIdrTypeWeight()){
			typeWeightIdSet.add(idrTypeWeight.getId());
		}
		for(IdrTypeWeight idrTypeWeight:oldIdrYearTypeWeight.getIdrTypeWeight()){
			if(!typeWeightIdSet.contains(idrTypeWeight.getId())){
				entityManager.remove(idrTypeWeight);
			}
		}
		return entityManager.merge(idrYearTypeWeight);
	}

	private IdrYearTypeWeight create(IdrYearTypeWeight idrYearTypeWeight) {
		entityManager.persist(idrYearTypeWeight);
		return idrYearTypeWeight;
	}


}
