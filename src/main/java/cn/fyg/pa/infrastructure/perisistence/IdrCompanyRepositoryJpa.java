package cn.fyg.pa.infrastructure.perisistence;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.stereotype.Repository;

import cn.fyg.pa.domain.model.companykpi.IdrCompany;
import cn.fyg.pa.domain.model.companykpi.IdrCompanyRepository;

@Repository
public class IdrCompanyRepositoryJpa implements IdrCompanyRepository{
	
	@PersistenceContext
	private EntityManager entityManager;

	@Override
	public IdrCompany find(Long id) {
		return entityManager.find(IdrCompany.class, id);
	}

}
